# 034 - First Balance Pass After Expanded Mission

## Goal

Perform the first conservative balance pass after terrain variation, river/log crossing, water slowdown/cooling, second aid, report, runner, and atmosphere updates.

## Files / Directories to Inspect

- `GAME.md`
- `ROADMAP.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- the most recent reports in `reports/runs/`
- `reports/playtests/` if any new playtest notes exist
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Review pace, heat, hydration, quad, braking, cooling, crew, second aid, water, log, steep, switchback, uphill, and final-push tuning.
- Make conservative constant adjustments only where needed.
- Keep multiple play styles viable: cautious finish, reckless failure, skilled faster finish.
- Keep water/log choice meaningful without making the log mandatory.
- Keep the second aid station helpful but not free.
- Update the run report for this prompt with tuning rationale.
- Write the required run report and move only this prompt after validation.

## Out of Scope

- No new systems.
- No new mission.
- No terrain rewrite.
- No report overhaul.
- No realistic physics.
- No open world.
- No exact Western States recreation.
- No real maps, GPX, Strava, or external APIs.
- No multiplayer.
- No accounts.
- No package, script, workflow, automation, or dependency changes.
- No auto-push.
- No auto-merge.
- No auto-deploy.

## Acceptance Criteria

- Cautious play can finish.
- Reckless play can fail.
- Skilled faster play remains possible without total collapse.
- Control/brake play remains viable.
- Push/Send play remains tempting but dangerous.
- Cooling, crew, second aid, and water/log choices remain meaningful.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
