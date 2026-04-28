# Prompt 008 — Finish Line and Run Report

## Goal

Make the mission completeable and replayable.

## Files / Directories to Inspect

- `GAME.md`
- `docs/FORESTHILL_HEAT_DROP.md`
- `src/`

## Implementation Scope

- Add mission progress.
- Add a finish line.
- Trigger success when the player reaches the finish.
- Add run report screen for both success and failure.
- Report should show:
  - result
  - elapsed time
  - max heat
  - lowest hydration
  - final pace or pace usage if available
  - cause of failure if failed
  - verdict line
- Add restart from report.

## Out of Scope

- No saved stats.
- No online leaderboard.
- No share feature.
- No accounts.

## Acceptance Criteria

- Player can finish.
- Player can fail.
- Report appears in both cases.
- Report stats are understandable.
- Restart works.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Complete one run and intentionally fail one run. Confirm both reports make sense.
