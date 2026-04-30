# AI Development Rules

These rules apply to Codex, prompt runners, BC-OS, and any automation touching the game repo.

## Source of Truth

Before every run, read:

1. `GAME.md`
2. active prompt in `prompts/pending/`
3. most recent run report in `reports/runs/`, if present

Use the canonical docs to resolve ambiguity:
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `docs/PS1_3D_STYLE_GUIDE.md`

## One Prompt Per Run

Consume only one pending prompt per run.

No batching.

No "while I'm here" feature work.

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
- add high-poly asset requirements
- add complex water physics
- add an advanced animation tree early

## Current First-Mission Direction

The first mission is still one corridor: `Cal Street Heat Drop`.

Approved direction includes:
- downhill survival
- curves and switchbacks
- steeper downhill sections
- one short uphill section
- river crossing terrain
- safe/slow water versus fast/risky log choice
- water slowdown with possible small cooling benefit
- Foresthill crew start
- second aid station / support point
- cleaner PS1-style runner readability and simple animation
- trail-race course markers instead of checkpoint arches
- lightweight other runners, spectators, volunteers, and aid-station life as atmosphere
- richer dirt, rock, brush, water, log, fog, dust, and retro surface detail when it preserves readability

These are canon direction, but they must still be implemented one small prompt at a time.

## Playable Feel Over Architecture

The highest priority is:

> Does the downhill mission feel better?

Prefer:
- camera feel
- controls
- heat pressure
- resource feedback
- terrain readability
- crossing choice clarity
- course marker clarity
- other-runner and spectator readability
- trail surface clarity
- crew/aid choice clarity
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
- status
- summary
- files changed
- validation command
- validation result
- manual playtest notes
- known issues
- risk level
- next recommended prompt

If validation fails, write a blocked report.

Manual playtesting belongs to Brandon. Automated reports should say:

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

Do not edit `GAME.md` unless the prompt specifically says so.

Do not add mechanics that conflict with:
- PS1-style 3D
- portrait mobile touch-first play
- mission-based structure
- no open world
- no accounts
- no APIs
- heat/hydration/quad damage/crew/aid as core
- river/log choices as canyon terrain, not platformer spam

## Scope Creep Alarm

Flag prompts that try to add:
- exact Western States map
- full course recreation
- real GPS/GPX
- Strava
- online leaderboard
- multiplayer
- accounts
- career mode
- RPG systems
- realistic graphics overhaul
- huge asset packs
- many aid stations
- full swimming
- complex water simulation
- advanced log balance physics
- complex animation rig
- full race AI
- crowd simulation
- sponsor or checkpoint-arch systems
- heavy post-processing or high-resolution asset packs

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
