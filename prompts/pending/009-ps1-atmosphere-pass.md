# Prompt 009 — PS1 Atmosphere Pass

## Goal

Make the game look and feel more like a lost PS1 ultra-running game.

## Files / Directories to Inspect

- `GAME.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `src/`

## Implementation Scope

- Improve low-poly visual presentation.
- Add fog / limited draw distance if not present.
- Add harsh sun/canyon color palette.
- Add retro HUD styling.
- Add simple heat warning visual effects.
- Add more serious SUC/route intel text.
- Keep gameplay readable.

## Out of Scope

- No realistic graphics.
- No major renderer rewrite.
- No large asset packs.
- No new gameplay systems unless tiny visual feedback.

## Acceptance Criteria

- Screenshot has PS1 low-poly identity.
- HUD feels more SUC/tactical.
- Heat warnings are clearer.
- Performance remains acceptable.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Take a screenshot and judge whether it now feels distinct instead of generic.
