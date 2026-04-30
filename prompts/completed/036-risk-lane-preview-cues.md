# Implementation Prompt: Risk Lane Preview Cues

## Context

Cal Street Heat Drop now has a playable portrait-first loop with route intel, crew start, downhill survival, authored route zones, risk lanes, river/log choice, second aid, finish/failure, run report coaching, PS1 atmosphere, runner animation, balance tuning, and a clearer touch deck.

The current HUD reports the active line once the runner is already in it, and route-zone transitions preview upcoming major sections. The next playtest would benefit from clearer anticipation of small line-choice opportunities before the player commits, especially shade, rocky, fast/exposed, safe center, water, and log lanes.

## Goal

Add a small preview layer that helps players read the next lane-choice opportunity before they enter it.

## Why This Matters

Line choice is one of the core ways the player expresses skill. If the player only learns they are in a fast, rocky, shaded, water, or log line after entering it, steering feels reactive instead of tactical. Earlier lane previews should make braking, pacing, and line commitment clearer without changing the existing mechanics.

## Scope

Implement:

- Add compact HUD/status copy for the next nearby risk-lane opportunity using the existing risk-lane definitions.
- Add simple PS1-style approach markers or edge cues before authored lane windows so shade, rocky, fast/exposed, safe, water, and log choices are easier to read in portrait view.
- Keep current active lane behavior, route-zone previews, resource mechanics, and run-report tracking intact.
- Keep the preview terse enough that it does not crowd the HUD, route row, touch deck, runner, or trail hazards.

## Out of Scope

Do not implement:

- new lane mechanics, new resources, new route zones, new mission length, or broad balance retuning
- procedural terrain, branching trails, map editors, real maps, GPX, Strava, accounts, multiplayer, servers, or external APIs
- a HUD redesign, route-intel rewrite, report redesign, new input system, or new dependencies
- manual browser playtesting inside the automation run

## Acceptance Criteria

- [ ] Build passes
- [ ] Prompt ledger remains valid
- [ ] Feature is visible or testable
- [ ] The change improves game feel, clarity, loop, or player decision-making
- [ ] No unrelated systems are added

## Validation

Run:

`npm run build:goblin`
`npm run agent:check`

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.
