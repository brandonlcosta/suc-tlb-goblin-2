# Prompt 001 — Minimal Prototype Shell

## Goal

Create the minimal playable prototype shell for `SUC: The Long Burn`.

## Files / Directories to Inspect

- `GAME.md`
- `ROADMAP.md`
- `docs/VISUAL_STYLE_GUIDE.md`
- repo root

## Implementation Scope

- Set up the smallest browser game app if no app exists.
- Prefer Vite + TypeScript + Canvas.
- Create a game canvas.
- Render a retro/pixel-style placeholder screen.
- Draw a simple trail corridor.
- Draw a placeholder runner.
- Make the runner move forward automatically.
- Add basic restart support.
- Add minimal HUD text:
  - game title
  - mission name
  - progress placeholder

## Out of Scope

- No heat system.
- No hydration system.
- No crew zone.
- No run report.
- No real art assets.
- No sound.
- No external APIs.

## Acceptance Criteria

- App starts locally.
- Canvas renders.
- Trail corridor is visible.
- Runner moves automatically.
- Restart does not crash.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Open the game and confirm the runner visibly moves down a retro trail-like corridor.
