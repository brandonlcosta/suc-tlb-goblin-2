# Prompt 005 — Pace Modes

## Goal

Add simple risk/reward pacing.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add four pace modes:
  - Easy
  - Steady
  - Push
  - Send
- Use keys 1–4 to switch pace.
- Pace affects speed.
- Pace affects heat gain.
- Pace affects hydration drain.
- Display current pace in HUD.

## Out of Scope

- No power model.
- No advanced fatigue.
- No biomechanics.
- No animations required beyond simple speed feedback.

## Acceptance Criteria

- Keys 1–4 switch pace.
- Speed changes by pace.
- Heat/hydration pressure changes by pace.
- HUD shows current pace.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Use Send for a full minute and verify it feels faster but dangerous.
