# Prompt 002 — Third-Person Trail Corridor

## Goal

Make the prototype feel like a retro third-person trail runner instead of a flat placeholder.

## Files / Directories to Inspect

- `GAME.md`
- `docs/VISUAL_STYLE_GUIDE.md`
- `src/`

## Implementation Scope

- Improve the trail corridor to create pseudo-third-person depth.
- Add simple scaling/parallax if appropriate.
- Keep the runner near the lower center of the screen.
- Add simple trail edges, dust, rocks, or background hints.
- Preserve pixelated style.
- Keep performance simple.

## Out of Scope

- No real 3D engine conversion.
- No complex animation.
- No asset dependency.
- No procedural world.

## Acceptance Criteria

- The view feels more like running forward on a trail.
- Runner remains readable.
- Trail direction is clear.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Play for 30 seconds and verify the screen reads as a forward trail-running view.
