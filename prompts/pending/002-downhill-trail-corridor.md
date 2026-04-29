# Prompt 002 — Downhill Trail Corridor

## Goal

Make the first mission feel like a downhill trail section.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `src/`

## Implementation Scope

- Replace/extend placeholder terrain with a simple downhill corridor.
- Add slope or visual downhill effect.
- Add basic trail boundaries.
- Add limited draw distance or fog if practical.
- Add simple low-poly rocks/trees/markers.
- Preserve PS1-style simplicity.

## Out of Scope

- No open world.
- No exact Cal Street map.
- No procedural terrain generator.
- No large assets.

## Acceptance Criteria

- The trail clearly reads as downhill.
- The path has boundaries.
- The camera can follow the runner down the section.
- Scene still performs smoothly.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Run for 30 seconds and confirm the game feels like descending a trail.
