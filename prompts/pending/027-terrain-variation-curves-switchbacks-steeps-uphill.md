# 027 - Terrain Variation: Curves, Switchbacks, Steeps, Uphill

## Goal

Add the first lightweight terrain-variation pass to the existing Cal Street Heat Drop mission: natural curves, readable switchback pressure, steeper downhill sections, and one short uphill heat check.

## Files / Directories to Inspect

- `GAME.md`
- `ROADMAP.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- the most recent reports in `reports/runs/`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Extend the current single-mission trail corridor with a small set of readable terrain zones:
  - fast downhill rollout
  - steeper downhill drop
  - curves / switchbacks
  - one short uphill heat check
  - final downhill survival push
- Add lightweight section modifiers for speed temptation, heat, hydration, quad damage, and/or control pressure where the existing code structure supports it.
- Add simple visual/HUD cues so players can read steep, switchback, and uphill sections before they enter them.
- Keep the route one corridor and preserve existing portrait touch controls.
- Write the required run report and move only this prompt after validation.

## Out of Scope

- No river crossings.
- No log crossings.
- No second aid station.
- No new mission.
- No open world.
- No exact Western States recreation.
- No real maps, GPX, Strava, or external APIs.
- No multiplayer.
- No accounts.
- No package, script, workflow, automation, or dependency changes.
- No auto-push.
- No auto-merge.
- No auto-deploy.

## Acceptance Criteria

- The mission includes readable curves/switchback-style turns.
- At least one steeper downhill section increases speed temptation and quad/control risk.
- One short uphill section slows the runner and increases heat/effort pressure.
- The mission remains a single readable corridor, not a maze.
- Existing heat, hydration, quad, pace, braking, cooling, crew, finish, and report flows still work.
- Touch controls and HUD remain portrait-safe.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
