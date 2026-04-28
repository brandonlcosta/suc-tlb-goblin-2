# Recommended Repo Structure

```txt
game-lab/
  GAME.md
  README.md
  ROADMAP.md
  package.json

  docs/
    FORESTHILL_HEAT_DROP.md
    MECHANICS_SPEC.md
    VISUAL_STYLE_GUIDE.md
    AUDIO_STYLE_GUIDE.md
    AI_DEVELOPMENT_RULES.md
    BC_OS_INTEGRATION.md
    REPO_STRUCTURE.md
    PLAYTEST_CHECKLIST.md
    DECISIONS.md
    BACKLOG.md

  prompts/
    pending/
    completed/
    blocked/

  reports/
    runs/
    playtests/

  src/
    main.ts
    game/
      Game.ts
      constants.ts
      state.ts
      input.ts
      update.ts
      render.ts
      hud.ts
      mission.ts
      crew.ts
      resources.ts
      runReport.ts
    styles/
      base.css

  tests/
    smoke.test.ts
```

## Root Files

### `GAME.md`

The design bible.

Every implementation run must read this.

### `ROADMAP.md`

The milestone plan.

### `README.md`

Human-facing setup and repo overview.

### `package.json`

Only after implementation begins.

Do not add dependencies casually.

## Docs

### `docs/FORESTHILL_HEAT_DROP.md`

First mission spec.

### `docs/MECHANICS_SPEC.md`

Heat, hydration, pace, crew, fatigue, cooling.

### `docs/VISUAL_STYLE_GUIDE.md`

Retro/pixel/SUC visual direction.

### `docs/AUDIO_STYLE_GUIDE.md`

Optional sound direction.

### `docs/AI_DEVELOPMENT_RULES.md`

Automation constraints.

### `docs/BC_OS_INTEGRATION.md`

How BC-OS should operate around the repo.

### `docs/PLAYTEST_CHECKLIST.md`

Manual review checklist.

### `docs/DECISIONS.md`

Important decisions and why they were made.

### `docs/BACKLOG.md`

Cool ideas that are not approved for current build.

## Prompt Queue

### `prompts/pending/`

Implementation prompts waiting for Codex.

### `prompts/completed/`

Prompts that were successfully completed and reviewed.

### `prompts/blocked/`

Prompts that failed, got too big, or need clarification.

## Reports

### `reports/runs/`

Codex run reports.

### `reports/playtests/`

Manual playtest notes.

## Source

Keep source simple at first.

Avoid complex architecture.

Suggested separation:
- input
- update loop
- rendering
- resources
- mission config
- crew logic
- run report

Do not build a generic engine before the game is fun.
