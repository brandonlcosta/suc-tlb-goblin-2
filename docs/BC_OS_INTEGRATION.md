# BC-OS Integration Plan

## Roles

BC-OS is the operator.

The game repo is the sandbox.

Codex is the worker.

Brandon is the final reviewer.

## What BC-OS Should Do

BC-OS can:
- capture rough ideas
- organize game notes
- maintain backlog docs
- generate implementation prompts
- read run reports
- summarize what changed
- recommend the next prompt
- detect scope creep
- prepare review summaries

BC-OS should act like:
- producer
- designer
- prompt writer
- report analyst
- scope guard

## What BC-OS Should Not Do

BC-OS should not:
- edit itself for this experiment
- auto-merge game changes
- auto-push branches
- auto-deploy the game
- let Codex run multiple prompts at once
- directly rewrite the game without a prompt
- let the repo become a giant simulator

## Game Repo Boundaries

The game repo should live separately.

Recommended path:

```txt
C:\dev\game-lab
```

or

```txt
C:\dev\suc-the-long-burn
```

BC-OS may write prompts into this repo, but game automation should not edit BC-OS.

## Prompt Flow

1. Brandon captures ideas.
2. BC-OS converts ideas into structured notes.
3. BC-OS checks the notes against `GAME.md`.
4. BC-OS writes one small prompt into `prompts/pending/`.
5. Codex runner consumes one pending prompt.
6. Codex works in a fresh branch/worktree.
7. Codex implements the feature.
8. Codex runs validation.
9. Codex writes a run report.
10. BC-OS reads the report.
11. BC-OS summarizes status and recommends next move.
12. Brandon reviews.
13. Brandon decides merge, revise, block, or continue.

## Review Flow

After each Codex run, BC-OS should produce a human review summary:

```txt
Prompt:
Result:
Files changed:
Validation:
Gameplay impact:
Risk:
Recommended decision:
Next prompt:
```

## Merge Rule

Only Brandon can approve merge.

No automation merges on its own.

## Deploy Rule

No auto-deploy.

Deploy only after manual approval.

## Ideal Rhythm

The best loop is small and steady:

- one prompt
- one feature
- one validation
- one report
- one review

This prevents the game from turning into a broken pile of half-built systems.
