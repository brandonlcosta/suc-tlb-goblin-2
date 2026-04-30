# Prompt 046 — Balance, Performance, and Clarity Pass

## Goal

Stabilize the game after the new environment, character, and atmosphere additions.

Clean up any performance issues, readability problems, or visual clutter introduced by recent prompts.

## Files / Directories to Inspect

- `GAME.md`
- `docs/PLAYTEST_CHECKLIST.md`
- `src/`
- latest reports in `reports/runs/`
- latest playtests in `reports/playtests/`

## Implementation Scope

Review and tune the recent additions:

- runner readability
- trail readability
- switchback readability
- water / log crossing clarity
- other runner count
- spectator density
- course marker clarity
- HUD legibility vs environment complexity
- performance hot spots
- camera readability around turns
- water/log crossing fairness
- fog and color contrast

Centralize any obvious tuning values if needed.

## Out of Scope

- no new big systems
- no second mission
- no engine swap
- no major art rewrite
- no broad architectural refactor
- no new dependency unless absolutely necessary and approved
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- game still starts and runs cleanly
- recent additions feel coherent together
- trail remains readable at speed
- runner remains readable
- performance is acceptable
- build passes
- run report is written

## Validation Command

```bash
npm run build
```

## Playtest Note

Do at least 3 runs and document where the visuals improve immersion vs where they hurt clarity.
