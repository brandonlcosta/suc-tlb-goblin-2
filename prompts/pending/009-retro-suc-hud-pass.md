# Prompt 009 — Retro SUC HUD Pass

## Goal

Make the game feel more like SUC and less like a generic prototype.

## Files / Directories to Inspect

- `GAME.md`
- `docs/VISUAL_STYLE_GUIDE.md`
- `src/`

## Implementation Scope

- Improve HUD styling.
- Add route intel-style labels.
- Add warning text for heat/hydration states.
- Add retro/pixel presentation improvements.
- Add short SUC-style flavor text where appropriate.
- Keep the game readable.

## Out of Scope

- No new gameplay systems.
- No new missions.
- No major layout rewrite.
- No asset-pack dependency.

## Acceptance Criteria

- HUD is clearer.
- Retro/SUC tone is stronger.
- Warning states are more obvious.
- Gameplay readability is not reduced.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Take a screenshot and judge whether the game now has a distinct SUC identity.
