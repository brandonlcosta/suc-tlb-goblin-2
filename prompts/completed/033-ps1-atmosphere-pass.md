# 033 - PS1 Atmosphere Pass

## Goal

Refresh the PS1 canyon atmosphere so the expanded terrain, river/log crossing, aid stations, and runner readability all feel like one coherent lost PlayStation-era ultra-running game.

## Files / Directories to Inspect

- `GAME.md`
- `ROADMAP.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/AUDIO_STYLE_GUIDE.md`
- `docs/PLAYTEST_CHECKLIST.md`
- the most recent reports in `reports/runs/`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Polish existing low-poly visual language for canyon heat, fog, trail surfaces, river water, logs, aid-station props, and warning cues.
- Keep changes lightweight and code-native; do not add art/audio asset packs.
- Improve atmosphere in the current scene without changing core mechanics.
- Add small audio hooks only if they already fit the existing audio approach and do not require assets.
- Preserve portrait readability and touch controls.
- Write the required run report and move only this prompt after validation.

## Out of Scope

- No realistic graphics overhaul.
- No large art assets.
- No licensed audio.
- No complex lighting system.
- No broad UI redesign.
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

- Expanded mission elements share a coherent PS1 low-poly style.
- River/log visuals are readable.
- Steep/uphill/switchback/aid cues are readable.
- HUD and touch controls remain portrait-safe.
- The game does not drift toward modern realism.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
