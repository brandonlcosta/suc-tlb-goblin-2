# SUC: The Long Burn

This repository is the sandbox environment for an autonomous Codex game-building loop.

## Purpose
- Initialize a clean seed repository for **SUC: The Long Burn**.
- Keep game design grounded in `GAME.md`.
- Keep automation behavior grounded in `docs/AI_DEVELOPMENT_RULES.md`.
- Process implementation work through prompt queue files in `prompts/`.

## Current Status
Initial scaffold only. No gameplay features have been implemented yet.

## Repository Layout
- `GAME.md` — game design bible.
- `ROADMAP.md` — phased implementation plan.
- `docs/` — specifications and AI development constraints.
- `prompts/` — queued and processed codex prompts.
- `reports/` — run logs and playtest artifacts.
- `src/` — source code (currently empty scaffold).
- `tests/` — test suite scaffold.

## Prompt Queue
- Pending prompts live in `prompts/pending/`.
- The first implementation prompt is kept as:
  - `prompts/pending/001-minimal-prototype-shell.md`

## Non-goals for Seed Setup
- No multiplayer.
- No accounts/authentication.
- No external APIs or online services.
- No real GPX dependency.
- No deployment setup.
