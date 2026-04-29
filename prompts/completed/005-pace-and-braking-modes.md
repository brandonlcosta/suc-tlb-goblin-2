# Prompt 005 — Pace and Braking Modes

## Goal

Make downhill restraint tactical.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add pace modes:
  - Control
  - Steady
  - Push
  - Send
- Use keys 1–4 to switch.
- Pace affects speed, heat gain, hydration drain, and quad damage.
- Braking/control input reduces speed and can reduce damage risk.
- Display current pace in HUD.

## Out of Scope

- No complex physics model.
- No biomechanics.
- No stamina model.
- No new mission zones.

## Acceptance Criteria

- Pace keys work.
- Send feels fast and dangerous.
- Control feels slower and safer.
- Braking matters.
- HUD shows current pace.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Compare one run using Send and one run using Control/Steady. The consequences should differ.
