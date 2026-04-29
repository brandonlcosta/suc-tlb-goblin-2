# SUC: The Long Burn — PS1 Cal Street Roadmap Package

This is the revised planning package for **SUC: The Long Burn**.

The game direction is now:

> A PS1-style, low-poly 3D ultra-running survival game centered on a serious downhill trail section inspired by the Cal Street / Foresthill energy of Western States.

This is not a goofy loop arcade game anymore.

It should feel like:
- low-poly 3D trail running
- serious downhill momentum
- heat management
- hydration pressure
- quad damage
- ice and crew execution
- SUC grit
- Foresthill-to-canyon descent energy
- old-school PlayStation atmosphere

The first mission is:

# Cal Street Heat Drop

A fictionalized, Western States-inspired downhill section where the player leaves a Foresthill-style crew zone and descends into exposed canyon heat.

## Core Rule

Do not build a huge open world.

Build one intense downhill mission first.

The goal is not realism.  
The goal is pressure, heat, momentum, and atmosphere.

## Recommended Repo Name

```txt
C:\dev\suc-the-long-burn
```

or

```txt
C:\dev\game-lab
```

## Recommended Stack

For the first build, use:

- Browser game
- TypeScript
- Vite
- Three.js or another lightweight 3D renderer
- Low-poly PS1-inspired visuals
- No external APIs
- No real maps
- No account system

The game can be true 3D, but the scope must stay narrow:
- one runner
- one trail corridor
- one mission
- simple terrain
- simple low-poly props
- simple HUD
- simple systems

## Package Contents

```txt
GAME.md
ROADMAP.md
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
    001-minimal-ps1-3d-prototype-shell.md
    002-downhill-trail-corridor.md
    003-runner-control-camera-and-momentum.md
    004-heat-hydration-and-quad-damage.md
    005-pace-and-braking-modes.md
    006-ice-and-cooling-system.md
    007-foresthill-crew-zone.md
    008-finish-line-and-run-report.md
    009-ps1-atmosphere-pass.md
    010-first-balance-pass.md
reports/
  runs/
  playtests/
```

## How to Use

Drop this package into the game repo.

BC-OS should use it as the source planning layer:
- generate prompts
- read reports
- summarize progress
- flag scope creep
- decide what prompt should happen next

Codex should implement one pending prompt at a time in the game repo.

No auto-push.  
No auto-merge.  
No auto-deploy.  
Brandon reviews everything.
