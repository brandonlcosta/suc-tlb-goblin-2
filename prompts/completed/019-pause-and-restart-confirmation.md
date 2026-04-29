# 019 - Pause And Restart Confirmation

## Goal

Add a small pause flow and safer restart confirmation so a mobile player can stop or restart without accidental run loss.

## Context

The current build has restart buttons, but prompt 017 identified that there is no pause state and no restart confirmation during a run. This should be a narrow control-flow polish pass.

## Files / Directories to Inspect

- `GAME.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Add a pause button suitable for portrait mobile.
- Add a paused overlay with resume and restart options.
- Add restart confirmation for active descent restarts.
- Preserve direct restart from terminal run report if that remains simpler and clear.
- Pause should stop resource drain, progress, and movement while still rendering safely.
- Keyboard fallback may use `P` for pause if it fits the existing input pattern.

## Out of Scope

- No settings menu.
- No save/load.
- No quit flow.
- No new platform APIs beyond the existing app runtime.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- The player can pause during active descent.
- Paused state prevents movement and resource changes.
- Resume returns to the same run state.
- Restart during an active run requires confirmation.
- Existing route intel, crew, descent, finish, and report flow still works.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
