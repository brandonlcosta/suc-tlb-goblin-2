# Queue Run Report: Goblin Queue

Date: 2026-04-30

## Start Time

2026-04-30T04:11:31.469Z

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
?? prompts/pending/

## Stop Reason

Stopped immediately after failure.

## Final Queue Counts

- Pending: 10
- Completed: 35
- Blocked: 1

## Commands Run

- `git status --short`

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- Queue run stopped before attempting additional prompts: Working tree is dirty before a goblin:main run. Refusing to continue.
git status --short output:
?? prompts/pending/

## Risk Level

Medium. The runner stopped on a safety condition and did not continue.
