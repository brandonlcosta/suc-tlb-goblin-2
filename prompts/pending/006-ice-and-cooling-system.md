# Prompt 006 — Ice and Cooling System

## Goal

Add the signature cooling mechanic.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add an Ice Active meter or cooling timer.
- Add a cooling charge or pickup.
- Press Space to use cooling if available.
- Cooling reduces heat or heat gain temporarily.
- Add visual feedback when cooling is active.
- Show Ice Active in the HUD.

## Out of Scope

- No full inventory.
- No multiple cooling item types yet.
- No crew menu yet.
- No complex animations.

## Acceptance Criteria

- Player can activate cooling.
- Cooling visibly affects heat.
- Cooling has limited duration or charges.
- HUD shows cooling state.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Wait until heat is high, trigger cooling, and confirm heat pressure eases.
