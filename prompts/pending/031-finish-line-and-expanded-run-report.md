# 031 - Finish Line and Expanded Run Report

## Goal

Update the finish and run report so the expanded first mission clearly recaps terrain, river/log, crew, and second-aid decisions.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- the most recent reports in `reports/runs/`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Preserve the existing finish, failure, restart, and report flow.
- Add concise report fields only where the current implementation has data or can track it simply:
  - river/log crossing choice and outcome
  - second aid choice
  - steep/downhill/uphill cost if already tracked
  - next-run coaching recommendation
- Keep report text serious, short, and actionable.
- Avoid clutter in portrait.
- Write the required run report and move only this prompt after validation.

## Out of Scope

- No persistent run history.
- No scoring overhaul.
- No achievements.
- No leaderboard.
- No new mission.
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

- The player can still finish or fail.
- The run report remains readable on a portrait phone viewport.
- New mission decisions appear in the report when data exists.
- Next-run advice is concise and changes based on obvious run patterns if implemented.
- Existing report stats still render.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
