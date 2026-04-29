# 018 - Title Screen And Start Flow

## Goal

Add a simple title/start screen before the existing route intel overlay so the game has a clear first impression and an intentional start flow.

## Context

Prompt 017 found that the current build starts directly on route intel. That is functional, but abrupt. The game should first establish `SUC: The Long Burn`, `Cal Street Heat Drop`, and the portrait-first mission tone before the player enters route intel.

## Files / Directories to Inspect

- `GAME.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Add a title overlay shown before route intel.
- Include the game title, mission name, and one concise line of tone-setting text.
- Add one large touch-friendly start button that advances to the existing route intel overlay.
- Restart should return to the title screen unless the existing restart flow has a clearly safer local pattern.
- Keep the existing route intel, crew zone, descent, and run report behavior intact.
- Preserve keyboard fallback behavior where present.

## Out of Scope

- No menu system.
- No settings screen.
- No save data.
- No new assets or dependencies.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- The first visible UI is a title/start overlay.
- The start button advances to the existing route intel.
- The route intel to crew to descent flow still works.
- Restart works and does not strand the player in a hidden state.
- The screen remains portrait mobile friendly.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
