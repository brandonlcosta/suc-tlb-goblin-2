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

Milestone plan and staged implementation order.

### `README.md`

Human-facing setup and overview.

## Docs

### `docs/CAL_STREET_HEAT_DROP.md`

First mission spec, including the expanded mission shape: Foresthill start, fast rollout, steeper drop, curves/switchbacks, river/log crossing, short uphill, second aid station, final push.

### `docs/MECHANICS_SPEC.md`

Heat, hydration, quad damage, pace, braking, terrain modifiers, water slowdown/cooling, log crossing, crew/aid, and report stats.

### `docs/PS1_3D_STYLE_GUIDE.md`

Visual target, cleaner low-poly runner direction, simple animation guidance, race-marker language, lightweight race actors, and canyon terrain art cues.

### `docs/LEVEL_DESIGN_GUIDE.md`

How to shape the downhill course: one corridor, readable turns, switchbacks, steeper downhill, short uphill, river/log placement, trail-race markers, simple race atmosphere, second aid placement, and fair hazards.

### `docs/AUDIO_STYLE_GUIDE.md`

Optional audio direction for footsteps, heat pressure, water/log feedback, crew/aid blips, and canyon ambience.

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

The active queue should prioritize one small feature per run and keep future work aligned with the expanded first mission.

### `prompts/completed/`

Completed prompts. These are historical ledger entries.

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
