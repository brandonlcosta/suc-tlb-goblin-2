# 030 - Foresthill Crew Start and Second Aid Station

## Goal

Keep the existing Foresthill crew start intact and add a second quick aid station / support point before the final downhill survival push.

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

- Add one second aid station/support point after the river/uphill pressure and before the final push.
- Reuse existing crew/support UI patterns where possible.
- Offer quick choices only, such as hydration top-off, ice/cooling reset, water dump, fuel/support, or skip.
- Make choices affect hydration, cooling/heat, fuel/support if already represented, time, and final survival pressure.
- Add simple low-poly/retro visual cues for the support point if practical.
- Keep the first Foresthill crew start working.
- Write the required run report and move only this prompt after validation.

## Out of Scope

- No many-aid-station system.
- No full crew management sim.
- No detailed nutrition inventory.
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

- The mission still starts with Foresthill-style crew support.
- A second aid station appears before the final survival push.
- Second aid choices are quick, tappable, and portrait-safe.
- Choices affect resources and/or time in a clear way.
- Skipping aid saves time but carries risk.
- The support point does not become a management sim.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
