# BC-OS Integration Plan

## Roles

BC-OS is the operator.

The game repo is the sandbox.

Codex is the implementation worker.

Brandon is the final reviewer.

## BC-OS Should Do

BC-OS can:
- capture rough ideas
- organize design notes
- update backlog docs
- generate one implementation prompt at a time
- read run reports
- summarize what changed
- recommend next prompt
- detect scope creep
- keep the game aligned with `GAME.md`

Current canon direction to protect:
- one Cal Street / Foresthill-inspired mission
- portrait mobile touch-first play
- PS1-style low-poly 3D
- downhill survival with heat, hydration, quad damage, ice, crew, and aid choices
- terrain variation with curves, switchbacks, steeper downhill, and one short uphill
- river/log crossing decisions as canyon terrain
- cleaner readable runner model/animation inside PS1 style

## BC-OS Should Not Do

BC-OS should not:
- edit itself for this experiment
- auto-merge game changes
- auto-push branches
- auto-deploy
- let Codex run multiple prompts at once
- allow the game to become a giant course simulator
- directly rewrite the game without a prompt
- turn river/log crossings into platformer spam
- turn aid stations into a full management sim

## Game Repo Boundary

The game repo must stay separate from BC-OS.

Game automation must not edit BC-OS.

## Loop

1. Brandon captures a game idea.
2. BC-OS organizes it.
3. BC-OS checks it against `GAME.md`.
4. BC-OS writes one small prompt into `prompts/pending/`.
5. Codex consumes one prompt.
6. Codex works in a fresh worktree.
7. Codex implements the feature.
8. Codex validates.
9. Codex writes a run report.
10. BC-OS summarizes the report.
11. Brandon reviews and decides.
12. Approved work can be merged manually.

## Review Summary Format

BC-OS should summarize runs like:

```txt
Prompt:
Result:
Files changed:
Validation:
Gameplay impact:
Scope risk:
Known issues:
Recommended decision:
Next prompt:
```

## Prompt Quality Checklist

Each prompt should include:
- title
- goal
- files/directories to inspect
- implementation scope
- out of scope
- acceptance criteria
- validation command
- playtest note

Each prompt should enforce:
- one feature per run
- no open world
- no exact Western States recreation
- no real maps
- no external APIs
- no multiplayer
- no accounts
- no auto-push
- no auto-merge
- no auto-deploy

## Final Rule

BC-OS is allowed to be ambitious.

The game repo is not.

The game repo should stay narrow until Cal Street Heat Drop is genuinely playable.
