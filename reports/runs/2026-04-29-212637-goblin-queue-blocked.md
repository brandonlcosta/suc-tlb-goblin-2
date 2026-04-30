# Queue Run Report: Goblin Queue

Date: 2026-04-30

## Start Time

2026-04-30T04:26:37.209Z

## Status

blocked

## Summary

Queue supervisor run for `npm run goblin:main`. The runner starts at most one `goblin:main` process per pending prompt attempt, validates after each successful process, and stops on the first dirty git state, command failure, queue invariant failure, empty queue, or configured max-run limit.

## Prompts Attempted

- None.

## Successful Runs

0

## Failure Reason

Working tree is dirty before a goblin:main run. Refusing to continue.
git status --short output:
M GAME.md
 M README.md
 M ROADMAP.md
 M docs/AI_DEVELOPMENT_RULES.md
 M docs/BACKLOG.md
 M docs/BC_OS_INTEGRATION.md
 M docs/CAL_STREET_HEAT_DROP.md
 M docs/DECISIONS.md
 M docs/LEVEL_DESIGN_GUIDE.md
 M docs/MECHANICS_SPEC.md
 M docs/PLAYTEST_CHECKLIST.md
 M docs/PS1_3D_STYLE_GUIDE.md
 M docs/REPO_STRUCTURE.md
 D prompts/pending/037-update-canonical-docs-for-environment-and-race-atmosphere.md
?? prompts/completed/037-update-canonical-docs-for-environment-and-race-atmosphere.md
?? reports/runs/2026-04-29-211158-goblin-queue-blocked.md
?? reports/runs/2026-04-29-2119-canonical-docs-environment-race-atmosphere.md

## Stop Reason

Stopped immediately after failure.

## Final Queue Counts

- Pending: 9
- Completed: 36
- Blocked: 1

## Commands Run

- `git status --short`

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- Queue run stopped before attempting additional prompts: Working tree is dirty before a goblin:main run. Refusing to continue.
git status --short output:
M GAME.md
 M README.md
 M ROADMAP.md
 M docs/AI_DEVELOPMENT_RULES.md
 M docs/BACKLOG.md
 M docs/BC_OS_INTEGRATION.md
 M docs/CAL_STREET_HEAT_DROP.md
 M docs/DECISIONS.md
 M docs/LEVEL_DESIGN_GUIDE.md
 M docs/MECHANICS_SPEC.md
 M docs/PLAYTEST_CHECKLIST.md
 M docs/PS1_3D_STYLE_GUIDE.md
 M docs/REPO_STRUCTURE.md
 D prompts/pending/037-update-canonical-docs-for-environment-and-race-atmosphere.md
?? prompts/completed/037-update-canonical-docs-for-environment-and-race-atmosphere.md
?? reports/runs/2026-04-29-211158-goblin-queue-blocked.md
?? reports/runs/2026-04-29-2119-canonical-docs-environment-race-atmosphere.md

## Risk Level

Medium. The runner stopped on a safety condition and did not continue.
