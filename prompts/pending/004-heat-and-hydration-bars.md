# Prompt 004 — Heat and Hydration Bars

## Goal

Add the first core survival resources.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add Heat meter.
- Add Hydration meter.
- Heat rises over time.
- Hydration drains over time.
- Display both in the HUD.
- Add game-over if heat reaches max.
- Restart resets both values.

## Out of Scope

- No pace modifiers yet.
- No crew zone.
- No ice/cooling yet.
- No fatigue yet unless already easy.

## Acceptance Criteria

- Heat visibly rises.
- Hydration visibly drains.
- Heat at max triggers failure.
- HUD is readable.
- Restart works cleanly.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Let the game run without action until heat failure happens.
