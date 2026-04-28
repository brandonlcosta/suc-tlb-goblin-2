# ROADMAP — SUC: The Long Burn

## Phase 0: Repository Bootstrap (Current)
- Establish canonical docs.
- Establish prompt queue directories.
- Preserve Prompt 001 as pending.
- Create reports and code/test scaffolding.

## Phase 1: Minimal Prototype Shell
- Execute prompt `001-minimal-prototype-shell.md`.
- Implement only baseline runtime and loop skeleton.
- Add minimal tests and run report.

## Phase 2+: Iterative Prompt-Driven Expansion
- Consume prompts from `prompts/pending/` in order.
- Move completed prompts to `prompts/completed/`.
- Move blocked prompts to `prompts/blocked/` with rationale.
- Capture outcomes in `reports/runs/` and `reports/playtests/`.

## Guardrails
- Avoid premature architecture expansion.
- Stay aligned to `GAME.md` and `docs/AI_DEVELOPMENT_RULES.md`.
- No deployment or online services during early loop phases.
