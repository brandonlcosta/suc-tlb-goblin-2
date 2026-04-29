# 026 - HUD Readability Pass

## Goal

Reduce HUD clutter and improve scan readability on portrait mobile without removing important survival information.

## Context

Prompt 017 found that the HUD is useful but dense. It contains pace, time, heat, ice, hydration, quads, crew, pressure, progress, zone, line, and status.

## Files / Directories to Inspect

- `GAME.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Improve grouping, sizing, or prioritization of HUD elements.
- Keep heat, hydration, quads, pace, ice, progress, zone, and line available.
- Consider shortening labels where useful.
- Preserve live pressure readout behavior.
- Keep text inside containers on narrow viewports.

## Out of Scope

- No new gameplay system.
- No full visual redesign.
- No dependency additions.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- HUD information is easier to scan.
- No important existing survival state disappears.
- Touch controls and overlays still fit in portrait layout.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
