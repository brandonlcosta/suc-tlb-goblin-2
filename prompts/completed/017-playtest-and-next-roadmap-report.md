# 017 â€” Playtest And Next Roadmap Report

## Goal

Review the current playable state after prompts 001 and 003â€“016 have been completed. Do not build a major new feature. Produce a clear playtest-style report and a next prompt roadmap so the project can continue safely.

## Context

The prompt ledger currently has no pending prompts.

Completed prompts include:

- 001 minimal prototype shell
- 003 runner control, camera, and momentum
- 004 heat, hydration, and quad damage
- 005 pace and braking modes
- 006 ice and cooling system
- 007 Foresthill crew zone
- 008 finish line and run report
- 009 PS1 atmosphere pass
- 010 first balance pass
- 011 trail zone readability markers
- 012 portrait touch control deck
- 013 risk lane line choice
- 014 decision recap run report
- 015 pre-run route intel card
- 016 live pressure readout

Blocked:

- 002 downhill trail corridor

This pass should evaluate where the game actually is now and propose the next safe sequence of prompts.

## Tasks

1. Inspect the current game implementation.
2. Run existing validation/build commands.
3. Summarize the current playable loop.
4. Identify what feels complete, confusing, fragile, or missing.
5. Determine whether blocked prompt 002 is still needed or whether later prompts already replaced its purpose.
6. Create a playtest-style report.
7. Create the next 8â€“12 small pending prompt files for future goblin runs.

## Output report

Create:

```text
reports/playtests/YYYY-MM-DD-playtest-and-next-roadmap.md
```

The report should include:

- current playable loop summary
- what works
- what feels confusing
- what feels fragile
- missing player feedback
- mobile/touch issues
- balance issues
- whether blocked prompt 002 still matters
- recommended next development arc
- list of new prompts created

## New prompt requirements

Create new prompt files in:

```text
prompts/pending/
```

Start at:

```text
018-
```

Suggested prompt themes, adjusted based on actual inspection:

- title screen and start flow
- pause/restart controls
- stronger mobile touch affordances
- audio feedback or silent placeholder hooks
- course section transition polish
- heat/hydration warning clarity
- damage/fatigue tuning
- HUD readability pass
- second balance pass
- playtest feedback cleanup pass

Each new prompt must be:

- small
- sequential
- implementable alone
- scoped to one feature or polish pass
- safe for a single goblin run

## Do not

- Do not add multiplayer.
- Do not add accounts.
- Do not add external APIs.
- Do not add real maps.
- Do not add Strava.
- Do not add backend services.
- Do not rewrite the game architecture.
- Do not create a large open world.
- Do not consume or move any prompt except this one when the worker runs it.
- Do not push, merge, or deploy.

## Validation

Run:

```powershell
npm run build
npm run agent:check
```

## Final response

Report:

- Current game state summary
- Validation results
- Whether blocked prompt 002 still matters
- Playtest report path
- New pending prompts created
- Recommended next prompt to run
