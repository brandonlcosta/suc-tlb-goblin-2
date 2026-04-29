# 023 - Cooling And Crew Feedback Pass

## Goal

Make crew choices and cooling effects more visible during the run.

## Context

Crew support changes resources and temporary support timers, and cooling has strong heat effects. Prompt 017 found that refill, ice, and water are obvious, while gels, calm, and active cooling benefits could be clearer.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Show clearer active feedback for gel support and calm support while they are in effect.
- Improve cooling activation feedback in HUD/status text.
- Make crew choices easier to remember during descent and in the report.
- Use existing state and UI patterns where possible.

## Out of Scope

- No new crew actions.
- No inventory system.
- No nutrition system.
- No audio work in this prompt.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- Active crew support is visible during descent.
- Cooling effect is clear while active and after it is spent.
- Run report still records crew and ice timing.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
