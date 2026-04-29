# Prompt 003 — Runner Control, Camera, and Momentum

## Goal

Add basic third-person control and downhill momentum.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add left/right steering with A/D and arrow keys.
- Add forward/downhill movement.
- Add simple speed/momentum.
- Add brake/control input with S/down arrow or Shift.
- Keep runner within playable trail bounds.
- Smooth the chase camera enough to be playable.

## Out of Scope

- No complex physics.
- No ragdoll.
- No advanced animation.
- No mobile controls.

## Acceptance Criteria

- Player can steer.
- Player can brake/control speed.
- Downhill speed feels present.
- Camera remains readable.
- Runner stays in bounds.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Test steering and braking at speed. Confirm braking feels useful.
