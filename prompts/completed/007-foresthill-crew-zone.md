# Prompt 007 — Foresthill Crew Zone

## Goal

Add the starting crew zone for Cal Street Heat Drop.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add a Foresthill-style crew start zone.
- Add visible low-poly crew props:
  - table
  - cooler
  - cones/sign
- Add quick crew choice menu.
- Let player choose limited actions before starting or early in mission.
- Suggested actions:
  - refill bottles
  - ice bandana
  - water dump
  - grab gels
  - calm down
  - leave fast
- Choices affect resources/time.
- Add SUC-style crew text.

## Out of Scope

- No full crew character system.
- No voice acting.
- No multiple crew zones.
- No inventory management.

## Acceptance Criteria

- Crew zone is visible.
- Player can make crew choices.
- Choices affect run state.
- Leaving fast is possible but risky.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Start multiple runs with different crew choices and confirm the descent feels different.
