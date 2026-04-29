# Prompt 006 — Ice and Cooling System

## Goal

Add the signature SUC cooling mechanic.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add an Ice Active meter or cooling timer.
- Add one cooling charge.
- Press Space to use cooling.
- Cooling reduces heat or slows heat gain temporarily.
- Add visual feedback when cooling is active.
- Show cooling state in HUD.

## Out of Scope

- No multiple cooling types yet.
- No crew menu yet.
- No inventory.
- No audio requirement.

## Acceptance Criteria

- Player can activate cooling.
- Cooling visibly changes heat pressure.
- Cooling is limited.
- HUD shows cooling state.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Let heat rise, use cooling, and confirm the run stabilizes briefly.
