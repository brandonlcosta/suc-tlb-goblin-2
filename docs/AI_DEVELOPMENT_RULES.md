# AI Development Rules

These rules govern autonomous development in this repository.

## Core Workflow
1. Read `GAME.md` before changing gameplay logic.
2. Read relevant specs in `docs/` before implementation.
3. Consume prompts from `prompts/pending/` in numeric order.
4. Move processed prompt files to `prompts/completed/` or `prompts/blocked/`.
5. Record execution notes in `reports/runs/`.

## Seed-State Restrictions
- Do not implement unrequested features.
- Do not consume pending prompts during repository bootstrap.
- Do not add multiplayer, user accounts, or external service dependencies.
- Do not add real GPX ingestion or online integrations.
- Do not configure deployment pipelines at this stage.

## Engineering Principles
- Keep changes minimal and reversible.
- Prefer small, testable increments.
- Preserve deterministic behavior where possible.
- Write clear commit messages tied to prompt intent.
