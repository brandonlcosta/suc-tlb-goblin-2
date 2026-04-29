# 027 - Run Report Coaching Pass

## Goal

Make the run report more useful for replay by adding a concise next-run coaching recommendation.

## Context

The current report includes strong decision data and a discipline note. Prompt 017 found that it could more directly tell the player what to try next.

## Files / Directories to Inspect

- `GAME.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Add one compact report field for next-run advice.
- Derive advice from existing report data: heat, hydration, quads, pace mix, braking, ice timing, line choice, and crew choices.
- Keep advice serious, short, and actionable.
- Preserve existing report stats and restart flow.

## Out of Scope

- No persistent history.
- No scoring system overhaul.
- No achievements.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- The run report includes a concise next-run recommendation.
- Advice changes based on obvious run patterns.
- Existing report fields still render.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
