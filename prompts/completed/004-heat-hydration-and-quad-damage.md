# Prompt 004 - Heat, Hydration, and Quad Damage

## Goal

Add the core survival resources.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add Heat meter.
- Add Hydration meter.
- Add Quad Damage meter.
- Heat rises over time.
- Hydration drains over time.
- Quad damage rises with high speed/downhill aggression.
- Heat reaching max causes failure.
- Display all meters in HUD.
- Restart resets resources.

## Out of Scope

- No crew system.
- No cooling yet.
- No complex fatigue model.
- No report screen unless needed for failure message.

## Acceptance Criteria

- Heat rises.
- Hydration drains.
- Quad damage can rise.
- HUD displays all three.
- Heat max triggers game over/failure.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Run recklessly and confirm quad damage rises more than controlled running.
