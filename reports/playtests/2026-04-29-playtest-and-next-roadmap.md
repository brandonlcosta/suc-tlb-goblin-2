# Playtest And Next Roadmap Report

Date: 2026-04-29

Inspection mode: Automated code inspection and CLI validation only. No browser session or manual UI playtest was performed.

## Current Playable Loop Summary

The current build is a single portrait-first Cal Street Heat Drop mission. The player starts on a route intel overlay, enters a Foresthill crew zone, picks up to two crew actions or leaves fast, then descends a low-poly downhill trail with steering, braking, pace selection, cooling, risk lanes, route zones, heat, hydration, quad damage, live pressure feedback, finish/failure states, and a compact run report.

The loop is recognizable and playable on paper: read the route, choose support, descend with restraint, react to heat/hydration/quad pressure, spend ice, reach the finish or fail, then use the report to adjust the next run.

## What Works

- The core survival structure is present: heat rises, hydration drains, quad damage accumulates, and failure conditions exist.
- Pace modes are meaningful in code. Control, Steady, Push, and Send alter speed and resource pressure.
- Braking has a tactical role by reducing speed pressure, heat gain, and quad gain.
- Crew choices affect the run through hydration refill, ice, water dump, gel support, calm support, or leave-fast risk.
- Cooling has clear mechanical hooks: charge count, active duration, immediate heat drop, reduced heat gain, and visual state.
- The trail is no longer just a placeholder. It has downhill height, curves, changing width, boundaries, route zones, low-poly rocks/trees, finish markers, fog, and route/risk lane cue geometry.
- The HUD has useful state: pace, time, heat, ice, hydration, quads, crew, progress, zone, line, status, and live pressure chips.
- The run report now summarizes finish/failure, resource extremes, crew choices, pace mix, brake time, ice timing, primary line, and discipline notes.

## What Feels Confusing

- There is no title/start screen, so the first user-facing state is already route intel. That is functional but abrupt.
- The route intel and crew overlays explain strategy, but they do not clearly show the full screen flow: intel to crew to descent to report.
- The touch controls use labels like `1`, `2`, `3`, `4`, `<`, and `>` that are clear for debugging but less natural for mobile-first play.
- Risk lane names appear once the player is already in them; there is limited preview of which line is coming next.
- Live pressure chips show directionality, but the exact relationship between pace, braking, line choice, and resource changes is still indirect.
- The report gives good data, but the strongest next-action coaching could be more explicit.

## What Feels Fragile

- The game is still concentrated in `src/main.ts`, so feature work can easily collide unless prompts stay narrow.
- Standard `npm run build` still fails locally on a pre-existing ignored `dist/assets` permission issue. `npm run build:goblin` passes and should remain the direct-main automation validation path.
- No automated browser smoke test exists, and this run intentionally did not open a browser.
- UI density is high for a portrait phone. The HUD, route intel, touch controls, and run report all need real-device review.
- Audio is absent, so critical feedback depends entirely on visual state.

## Missing Player Feedback

- No title state to establish mission identity before route intel.
- No pause state or restart confirmation during a run.
- No audio cues or silent audio hooks for heat danger, ice use, crew exit, finish, or collapse.
- No stronger moment-to-moment warning escalation when hydration or quads become race-ending.
- No explicit feedback that braking is currently protecting quads.
- No preview indicator for upcoming risk lane opportunities.
- No summary recommendation like "next run: pick ice earlier" or "next run: use Control through the exposed shelf."

## Mobile And Touch Issues

- The touch controls are present and hidden outside descent, but their affordance is still more prototype than final mobile interface.
- Steering uses discrete left/right buttons instead of a more forgiving thumb zone or drag/hold surface.
- The cooling button is small relative to its importance and may compete with brake on the lower-right deck.
- Crew choices may wrap to two columns on small screens, but the button text still needs real device review for tap confidence.
- The HUD pressure row and resource row may compete for vertical space on short mobile viewports.

## Balance Issues

- Balance cannot be judged without manual play, but the current tuning supports the intended risk model in code.
- Send and fast/exposed lanes add speed and pressure; Control and braking reduce pressure.
- Crew calm and gels are useful but less visually obvious than refill, ice, and water dump.
- Cooling has only one charge unless crew picks ice, which is good for tactics but may make first-time runs feel unforgiving if the player misses the cue.
- The report can identify reckless patterns, but the player may need clearer in-run feedback before they fail.

## Blocked Prompt 002 Assessment

Blocked prompt `002-downhill-trail-corridor.md` no longer needs to be rerun as originally written.

Its acceptance criteria are now materially satisfied by later prompts:

- The trail reads as a downhill corridor through `trailHeightAt`, `trailCenterAt`, changing widths, and camera follow.
- Boundaries and shoulders exist in the trail mesh.
- Fog and draw distance exist through the WebGL fog uniforms and heat-based fog functions.
- Rocks, trees, route markers, crew zone props, and finish line props exist.
- Route zone and risk lane cue geometry provide section readability.

Keep `002` blocked as historical ledger context. Future trail work should be handled as new focused polish prompts, not by unblocking or replaying `002`.

## Recommended Next Development Arc

The next arc should avoid major systems and focus on making the existing loop easier to understand, safer to restart, and clearer under pressure.

1. Add an explicit title/start flow before route intel.
2. Add pause and restart confirmation.
3. Improve mobile touch affordances without changing the core controls.
4. Polish route section transitions and line previews.
5. Make heat, hydration, quad, and cooling warnings more legible.
6. Add minimal audio hooks or silent-safe feedback scaffolding.
7. Tune damage/fatigue and HUD density after those feedback improvements.
8. End with a second balance pass and a cleanup prompt based on Brandon's manual playtest.

## New Prompts Created

- `prompts/pending/018-title-screen-and-start-flow.md`
- `prompts/pending/019-pause-and-restart-confirmation.md`
- `prompts/pending/020-mobile-touch-affordance-pass.md`
- `prompts/pending/021-course-section-transition-polish.md`
- `prompts/pending/022-warning-clarity-pass.md`
- `prompts/pending/023-cooling-and-crew-feedback-pass.md`
- `prompts/pending/024-audio-feedback-hooks.md`
- `prompts/pending/025-damage-fatigue-tuning-pass.md`
- `prompts/pending/026-hud-readability-pass.md`
- `prompts/pending/027-run-report-coaching-pass.md`
- `prompts/pending/028-second-balance-pass.md`

## Validation Notes

- `npm run agent:check` passed before report generation.
- `npm run build` was run and failed on the existing ignored `dist/assets` Windows permission issue.
- `npm run build:goblin` passed.

## Manual Playtest

Manual playtest: Not performed; requires Brandon to run locally.

