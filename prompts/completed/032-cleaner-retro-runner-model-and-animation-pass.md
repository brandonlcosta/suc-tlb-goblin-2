# 032 - Cleaner Retro Runner Model and Animation Pass

## Goal

Improve runner readability and movement feel inside the PS1 style with a cleaner low-poly silhouette and simple animation feedback.

## Files / Directories to Inspect

- `GAME.md`
- `ROADMAP.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/MECHANICS_SPEC.md`
- `docs/PLAYTEST_CHECKLIST.md`
- the most recent reports in `reports/runs/`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Improve the low-poly runner shape so the silhouette, posture, and running direction are easier to read in portrait.
- Add or refine simple animation states where practical:
  - basic run cycle
  - downhill lean
  - braking / controlled descent posture
  - optional wobble/stumble under high quad damage
- Keep the animation code simple and local to the existing runner/render structure.
- Preserve PS1 roughness and low-poly identity.
- Write the required run report and move only this prompt after validation.

## Out of Scope

- No high-poly model.
- No imported asset pack.
- No character creator.
- No motion capture.
- No complex animation tree.
- No water-splash animation unless it is trivial and already supported.
- No new mission.
- No open world.
- No exact Western States recreation.
- No real maps, GPX, Strava, or external APIs.
- No multiplayer.
- No accounts.
- No package, script, workflow, automation, or dependency changes.
- No auto-push.
- No auto-merge.
- No auto-deploy.

## Acceptance Criteria

- The runner reads more clearly in portrait.
- Running direction is obvious.
- Basic motion feels cleaner without modern-realism creep.
- Braking/control state is easier to recognize if implemented.
- High quad damage feedback remains readable if touched.
- Existing gameplay systems still work.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
