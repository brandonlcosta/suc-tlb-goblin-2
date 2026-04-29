# 025 - Damage Fatigue Tuning Pass

## Goal

Tune quad damage and late-run fatigue pressure so reckless descending feels costly without making controlled runs impossible.

## Context

Prompt 017 found that the risk model is present in code but still needs real tuning. This prompt should be a narrow constants-and-feedback pass, not a new system.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `src/main.ts`

## Implementation Scope

- Review existing speed, braking, pace, technical pressure, and quad damage constants.
- Make small tuning changes only where the current relationships are clearly too weak or too harsh by code inspection.
- If adjusting constants, explain the intended effect in the run report.
- Preserve the existing resource model.

## Out of Scope

- No new fatigue system.
- No biomechanics model.
- No UI redesign.
- No new dependencies.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- Send and fast/exposed choices remain risky.
- Control and braking remain viable.
- Quad damage remains meaningful late in the course.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
