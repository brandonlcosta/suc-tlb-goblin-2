# SUC: The Long Burn - Canonical Planning Package

This repo is the planning and implementation queue for **SUC: The Long Burn**.

The game direction is now:

> A portrait-mode mobile, touchscreen-first PS1-style low-poly 3D ultra-running survival game centered on a serious Cal Street / Foresthill-inspired downhill canyon section, with heat, hydration, quad damage, ice, crew, river/log crossing decisions, terrain variation, and SUC grit.

This is not a goofy loop arcade game.

It should feel like:
- a phone-first portrait trail survival game
- thumb-driven touchscreen control
- low-poly 3D trail running
- serious downhill momentum
- steeper downhill temptation
- curves and switchbacks that reward restraint
- one short uphill heat check
- river crossings that slow rhythm
- a faster/riskier log crossing line
- course flags, ribbon, stakes, and marker boards instead of arcade arches
- other runners and spectators used as lightweight race atmosphere
- rougher dirt, rock, brush, water, and trail-edge detail
- heat management
- hydration pressure
- quad damage
- ice and crew execution
- a second aid/support point before the final push
- cleaner PS1-style runner readability
- readable running stride, downhill lean, and braking posture
- advanced retro polish that stays low-poly and readable
- old-school PlayStation atmosphere

The first mission is:

# Cal Street Heat Drop

A fictionalized, Western States-inspired downhill section where the player leaves a Foresthill-style crew zone, descends into exposed canyon heat, crosses water, survives a short uphill interruption, uses a second aid station, and tries to hold the final downhill push together.

## Core Rule

Do not build a huge open world.

Build one intense downhill mission first.

The goal is not realism.
The goal is pressure, heat, momentum, line choice, and atmosphere.

## Recommended Stack

For the first build, use:

- Browser game
- TypeScript
- Vite
- Three.js or another lightweight 3D renderer
- Mobile-first portrait layout
- Touchscreen controls as the primary input
- Low-poly PS1-inspired visuals
- No external APIs
- No real maps
- No account system

The game can be true 3D, but the scope must stay narrow:
- one runner
- one trail corridor
- one mission
- simple terrain
- simple river/log crossing geometry
- simple aid-station props
- simple low-poly runner
- simple HUD
- portrait-safe on-screen controls
- simple systems

## Canonical Docs

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
  completed/
  blocked/
reports/
  runs/
  playtests/
```

## Active Prompt Direction

The queue should keep implementation small and staged. Current future work should move through:

1. Replace arches with trail-race flags, ribbon, stakes, and course markers.
2. Model switchbacks, curves, and varied trail geometry.
3. Add visible river water and modeled log crossing visuals.
4. Improve the retro runner model and readable running stride.
5. Add real trail surface and canyon environment detail.
6. Add other runners as lightweight race actors.
7. Add spectators, volunteers, and aid-station life.
8. Add advanced retro graphics polish without moving toward modern realism.
9. Balance performance, readability, and visual clarity after the atmosphere pass.

Completed prompts remain historical ledger entries. The active queue is the source for the next automation runs.

## How to Use

BC-OS should use this repo as the source planning layer:
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
