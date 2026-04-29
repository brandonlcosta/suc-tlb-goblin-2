# 029 - Water Slowdown and Cooling Tuning

## Goal

Tune water so it has mechanical meaning: a clear slowdown, optional small cooling benefit, and a real tradeoff against the faster/riskier log route.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- the most recent reports in `reports/runs/`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Review the river/log crossing implementation from prompt 028.
- Adjust water speed reduction so entering water clearly interrupts pace rhythm.
- Add or tune a small water cooling benefit if it can be done with existing resource logic.
- Ensure water cooling does not replace ice, crew, or second-aid support.
- Ensure safe water versus fast log remains an obvious tradeoff.
- Add concise HUD/report feedback only where useful and low-risk.
- Write the required run report and move only this prompt after validation.

## Out of Scope

- No new crossing types.
- No multiple rivers.
- No full swimming.
- No complex water depth simulation.
- No complex splash animation.
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

- Entering water slows the runner in a noticeable, readable way.
- Water may provide a small cooling benefit if implemented.
- The cooling benefit is smaller than dedicated ice/cooling support.
- Safe water and fast log choices both remain viable.
- Existing heat, hydration, quad, pace, braking, crew, finish, and report flows still work.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
