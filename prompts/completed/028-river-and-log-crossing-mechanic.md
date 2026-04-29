# 028 - River and Log Crossing Mechanic

## Goal

Add one memorable canyon river crossing with a safe/slower water route and a faster/riskier log route.

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

- Add one river crossing section to the existing first mission.
- Add a water route that slows the runner and remains safer than the log route.
- Add a log route that is faster but requires cleaner steering/control.
- Add clear visual/HUD feedback for entering water, choosing the log, and failing/missing the log if failure is represented.
- Keep log failure lightweight: speed loss and optional small quad/fatigue penalty using existing state.
- Track the crossing choice/outcome only if it fits the current report/state shape without broad refactor.
- Write the required run report and move only this prompt after validation.

## Out of Scope

- No multiple river system.
- No full swimming.
- No complex water physics.
- No advanced log balance physics.
- No platformer obstacle chain.
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

- The river crossing feels like canyon terrain, not an arcade obstacle.
- Water slows the runner.
- Log crossing is faster than water when executed well.
- Missing or failing the log has clear feedback and a contained cost.
- The crossing is readable and fair in portrait.
- Existing mission systems still work.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
