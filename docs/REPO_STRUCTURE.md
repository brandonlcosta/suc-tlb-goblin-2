# Recommended Repo Structure

```txt
suc-the-long-burn/
  GAME.md
  README.md
  ROADMAP.md
  package.json

  docs/
    CAL_STREET_HEAT_DROP.md
    MECHANICS_SPEC.md
    PS1_3D_STYLE_GUIDE.md
    LEVEL_DESIGN_GUIDE.md
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
      camera.ts
      runner.ts
      mission.ts
      terrain.ts
      resources.ts
      crew.ts
      runReport.ts
    styles/
      base.css

  tests/
    smoke.test.ts
```

## Root Files

### `GAME.md`

The design bible.

### `ROADMAP.md`

Milestone plan.

### `README.md`

Human-facing setup and overview.

## Docs

### `docs/CAL_STREET_HEAT_DROP.md`

First mission spec.

### `docs/MECHANICS_SPEC.md`

Heat, hydration, quad damage, pace, braking, crew.

### `docs/PS1_3D_STYLE_GUIDE.md`

Visual target.

### `docs/LEVEL_DESIGN_GUIDE.md`

How to shape the downhill course.

### `docs/AI_DEVELOPMENT_RULES.md`

Automation constraints.

### `docs/BC_OS_INTEGRATION.md`

How BC-OS interacts with the game repo.

### `docs/PLAYTEST_CHECKLIST.md`

Manual review checklist.

### `docs/DECISIONS.md`

Decision log.

### `docs/BACKLOG.md`

Future ideas not approved yet.

## Prompt Queue

### `prompts/pending/`

Codex implementation prompts waiting to run.

### `prompts/completed/`

Completed prompts.

### `prompts/blocked/`

Failed or too-large prompts.

## Reports

### `reports/runs/`

Codex run reports.

### `reports/playtests/`

Manual playtest notes.

## Source

Keep source boring.

Suggested modules:
- input
- camera
- runner
- terrain
- mission
- resources
- crew
- report

Do not build a generic engine before the mission feels good.
