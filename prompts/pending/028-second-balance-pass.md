# 028 - Second Balance Pass

## Goal

Perform a second small balance pass after the feedback and readability improvements from prompts 018 through 027.

## Context

Prompt 017 recommended that balance tuning follow flow and feedback improvements. This pass should make only small tuning changes based on the current code and any available run reports.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- the most recent reports in `reports/runs/`
- `src/main.ts`

## Implementation Scope

- Review pace, heat, hydration, quad, braking, cooling, crew, and lane tuning.
- Make conservative constant adjustments if needed.
- Keep multiple play styles viable: cautious finish, reckless failure, skilled faster finish.
- Update the run report for this prompt with the tuning rationale.

## Out of Scope

- No new systems.
- No second mission.
- No terrain rewrite.
- No dependency additions.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- Tuning remains consistent with the downhill survival fantasy.
- Control/brake play remains viable.
- Push/Send play remains tempting but dangerous.
- Cooling and crew remain meaningful.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
