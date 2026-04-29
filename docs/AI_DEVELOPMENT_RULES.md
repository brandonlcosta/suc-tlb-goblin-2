# AI Development Rules

These rules apply to Codex, prompt runners, BC-OS, and any automation touching the game repo.

## Source of Truth

Before every run, read:

1. `GAME.md`
2. active prompt in `prompts/pending/`
3. most recent run report in `reports/runs/`, if present

## One Prompt Per Run

Consume only one pending prompt per run.

No batching.

No “while I’m here” feature work.

## Fresh Worktree

Every implementation run should happen in a fresh branch or worktree.

No direct work on main.

## Narrow Scope

Implement the requested feature only.

Do not:
- rewrite the architecture
- switch engines
- add unrelated systems
- add dependencies without approval
- build a second mission early
- turn the game into an open world
- chase realistic graphics

## Playable Feel Over Architecture

The highest priority is:

> Does the downhill mission feel better?

Prefer:
- camera feel
- controls
- heat pressure
- resource feedback
- crew choice clarity
- report clarity

Avoid:
- generic engine abstractions
- premature ECS
- large refactors
- unused systems

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

## No Automatic Git Finalization

Automation must never:
- push automatically
- merge automatically
- deploy automatically
- delete user work
- rewrite history

Brandon reviews and decides.

## Design Bible Protection

Do not edit `GAME.md` unless the prompt specifically says so.

Do not add mechanics that conflict with:
- PS1-style 3D
- mission-based structure
- no open world
- no accounts
- no APIs
- heat/hydration/quad damage/crew as core

## Scope Creep Alarm

Flag prompts that try to add:
- exact Western States map
- full course recreation
- real GPS/GPX
- Strava
- online leaderboard
- multiplayer
- career mode
- RPG systems
- realistic graphics overhaul
- huge asset packs

Move those ideas to `docs/BACKLOG.md` unless explicitly approved.

## Definition of Done

A run is done only if:

- app starts
- mission loads
- build passes
- controls still work
- core loop still works
- prompt acceptance criteria are met
- run report is written
- known issues are documented

No fake done.
