# Prompt 010 — First Balance Pass

## Goal

Tune Foresthill Heat Drop so it is playable, replayable, and not instantly broken.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `docs/PLAYTEST_CHECKLIST.md`
- `src/`
- latest run reports, if available

## Implementation Scope

- Adjust heat gain.
- Adjust hydration drain.
- Adjust pace costs.
- Adjust cooling strength.
- Adjust crew effects.
- Adjust mission length if needed.
- Centralize tuning constants if not already centralized.
- Do not add major new mechanics.

## Out of Scope

- No new mission.
- No new resource system.
- No big refactor.
- No art overhaul.

## Acceptance Criteria

- New player can survive at least 2–3 minutes with reasonable play.
- Reckless Send pacing can still cook the player.
- Cooling and crew feel useful but not overpowered.
- Tuning values are easy to find.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Play three runs:
1. cautious
2. normal
3. reckless

Write what happened in the run report.
