# AI Development Rules

These rules are for Codex, prompt runners, BC-OS, or any automation touching the game repo.

## Source of Truth

Read these before every run:

1. `GAME.md`
2. `README.md`
3. `ROADMAP.md`
4. `docs/REPO_STRUCTURE.md`
5. `docs/BC_OS_INTEGRATION.md`
6. oldest numbered active prompt in `prompts/pending/`
7. most recent run report in `reports/runs/`, if present

Run `npm run agent:check` before and after consuming a queued prompt.

## One Prompt Per Run

The automation may consume only one pending prompt per run.

Do not combine prompts.

Always choose the oldest numbered prompt in `prompts/pending/` unless Brandon explicitly instructs otherwise.

If validation fails, move the consumed prompt to `prompts/blocked/` and document the failure. Do not leave a consumed prompt in `prompts/pending/`.

Do not “also fix” unrelated things unless required for the prompt to pass.

## Fresh Worktree

Every run should happen in a fresh branch or worktree.

No direct work on main.

## Narrow Scope

Implement the requested feature only.

Do not:
- rewrite the architecture
- change stack
- add unrelated systems
- add dependencies without approval
- create new game modes unless prompted
- convert the game into a different genre

## Playability Over Architecture

Prefer changes that make the game more playable.

Do not overbuild:
- ECS frameworks
- plugin systems
- data pipelines
- generic engines
- editor tooling
- abstractions for future features

Build the game.

## Reports Required

Every run must write a report to:

```txt
reports/runs/YYYY-MM-DD-HHMM-short-feature-name.md
```

Report must include:

- prompt filename
- summary
- files changed
- validation command
- validation result
- manual playtest notes
- known issues
- next recommended prompt

If validation fails, write a blocked report.

Automated Codex runs must not require manual browser playtesting. Use this exact report line:

```txt
Manual playtest: Not performed; requires Brandon to run locally.
```

## No Automatic Git Finalization

Automation must never:
- push automatically
- merge automatically
- deploy automatically
- delete user work
- rewrite history

Brandon reviews and decides.

## Design Bible Protection

Do not edit `GAME.md` unless the prompt specifically says to update it.

Do not add mechanics that conflict with:
- mission-based structure
- retro pixel style
- no multiplayer
- no accounts
- no external APIs
- no open world
- heat/hydration/crew as core

## Scope Creep Alarm

Flag any prompt that tries to add:
- real maps
- Strava
- online leaderboards
- RPG skill trees
- multiplayer
- account systems
- procedural open world
- complex animation systems
- huge asset packs

Move those ideas to `docs/BACKLOG.md` unless explicitly approved.

## Definition of Done

A run is done only if:

- app starts
- build passes
- core loop still works
- prompt acceptance criteria are met
- report is written
- known issues are documented

No fake done.
