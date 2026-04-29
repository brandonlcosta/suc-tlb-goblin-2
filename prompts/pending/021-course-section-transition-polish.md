# 021 - Course Section Transition Polish

## Goal

Make route section transitions easier to anticipate and read during descent.

## Context

The current route zones and markers exist, and blocked prompt 002 no longer needs to be rerun. Prompt 017 found that the player still has limited preview of upcoming risk and route changes.

## Files / Directories to Inspect

- `GAME.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Add or refine HUD copy for upcoming route section transitions.
- Improve in-world route marker timing or visibility using existing low-poly geometry patterns.
- Emphasize exposed, technical, shade, and finish transitions.
- Keep the existing route shape and length.
- Keep performance and PS1 simplicity intact.

## Out of Scope

- No new mission.
- No real map data.
- No procedural terrain system.
- No broad terrain rewrite.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- Upcoming section changes are easier to notice before the player reaches them.
- Existing route zones still drive HUD labels and resource pressure.
- The trail remains a simple downhill corridor.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
