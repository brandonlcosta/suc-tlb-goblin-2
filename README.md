# SUC: The Long Burn — Roadmap Package

This package is a planning starter kit for a separate experimental game repo.

The game is a retro, pixelated, SUC-inspired third-person trail ultra survival game. The first playable mission is **Foresthill Heat Drop**: a brutal Western States-inspired trail section where the player manages heat, hydration, ice, pacing, and crew execution.

This package is meant to guide an autonomous AI game-development loop without letting the automation sprawl.

## Core Rule

Build the smallest playable version first.

No open world.  
No accounts.  
No multiplayer.  
No real APIs.  
No real GPX dependency.  
No massive simulation.  
No asset-store dependency sprawl.

Make the player feel the heat, the dirt, the descent, the crew stop, and the decision to keep moving.

## Recommended Repo Name

```txt
C:\dev\game-lab
```

or

```txt
C:\dev\suc-the-long-burn
```

## Suggested Stack

Recommended first stack:

- Browser game
- TypeScript
- Vite
- Canvas or lightweight 2.5D renderer
- Pixel-art visual style
- No external online services

Do not start in a heavy engine unless there is a strong reason.

## Package Contents

```txt
GAME.md
ROADMAP.md
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
    001-minimal-prototype-shell.md
    002-third-person-trail-corridor.md
    003-runner-control-and-camera-feel.md
    004-heat-and-hydration-bars.md
    005-pace-modes.md
    006-ice-and-cooling-system.md
    007-crew-zone-triage.md
    008-finish-line-and-run-report.md
    009-retro-suc-hud-pass.md
    010-first-balance-pass.md
reports/
  runs/
  playtests/
```

## How BC-OS Should Use This

BC-OS should treat this package as the seed plan.

BC-OS can:
- generate future implementation prompts
- summarize run reports
- maintain the backlog
- flag scope creep
- recommend the next smallest feature

BC-OS should not:
- edit itself for this experiment
- auto-merge
- auto-push
- auto-deploy
- let Codex consume multiple prompts at once
- let the game become a giant open-world simulator

Brandon remains the final reviewer.
