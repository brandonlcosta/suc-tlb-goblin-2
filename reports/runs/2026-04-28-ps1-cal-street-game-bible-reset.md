# PS1 Cal Street Game Bible Reset

## Summary

Reset the project planning foundation to the PS1-style Cal Street Heat Drop direction from the uploaded roadmap package.

No implementation prompt was consumed during this reset.

## Why the Reset Happened

Brandon requested a clean creative reset away from the previous prototype direction and toward a small browser-game scope: low-poly PS1-style 3D trail running, downhill Cal Street / Foresthill descent energy, heat, hydration, quad damage, braking, pacing, ice, and crew-zone triage.

## Files Replaced

- `GAME.md`
- `README.md`
- `ROADMAP.md`
- `docs/AI_DEVELOPMENT_RULES.md`
- `docs/AUDIO_STYLE_GUIDE.md`
- `docs/BACKLOG.md`
- `docs/BC_OS_INTEGRATION.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/DECISIONS.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `docs/MECHANICS_SPEC.md`
- `docs/PLAYTEST_CHECKLIST.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/REPO_STRUCTURE.md`

## Automation Docs Updated

- `docs/PROMPT_PIPELINE.md` now notes the active queue was reset to the PS1 Cal Street direction.
- `.github/codex/prompts/stlb-run-one.md` now reads the Cal Street mission spec and PS1 style guide instead of the removed visual guide.

## Docs Archived or Removed

Archived under `docs/archive/2026-04-28-pre-ps1-cal-street-reset/`:

- `FORESTHILL_HEAT_DROP.md`
- `VISUAL_STYLE_GUIDE.md`

The active copies were removed because they are superseded by:

- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/PS1_3D_STYLE_GUIDE.md`

## Prompt Queue Archive Location

Old prompt queue files were moved to `prompts/archive/2026-04-28-pre-ps1-cal-street-reset/`.

Archived queue contents:

- blocked: `006-ice-and-cooling-system.md`
- completed: `001-minimal-prototype-shell.md`
- completed: `002-third-person-trail-corridor.md`
- completed: `003-runner-control-and-camera-feel.md`
- completed: `004-heat-and-hydration-bars.md`
- completed: `005-pace-modes.md`
- pending: `007-crew-zone-triage.md`
- pending: `008-finish-line-and-run-report.md`
- pending: `009-retro-suc-hud-pass.md`
- pending: `010-first-balance-pass.md`

Pre-reset run reports were preserved under `reports/runs/archive/2026-04-28-pre-ps1-cal-street-reset/` so the active ledger can start cleanly with no completed or blocked prompts.

## New Pending Prompt List

- `001-minimal-ps1-3d-prototype-shell.md`
- `002-downhill-trail-corridor.md`
- `003-runner-control-camera-and-momentum.md`
- `004-heat-hydration-and-quad-damage.md`
- `005-pace-and-braking-modes.md`
- `006-ice-and-cooling-system.md`
- `007-foresthill-crew-zone.md`
- `008-finish-line-and-run-report.md`
- `009-ps1-atmosphere-pass.md`
- `010-first-balance-pass.md`

Completed and blocked queues are empty except `.gitkeep`.

## Source Code Status

`src/` was not deleted, rewritten, or intentionally modified.

The current source may not match the new PS1 3D bible yet. Prompt `001-minimal-ps1-3d-prototype-shell.md` is responsible for creating or replacing the prototype shell.

## Validation Commands Run

- `npm run build:goblin`
- `npm run agent:check`

## Validation Result

`npm run build:goblin` passed.

The first `npm run agent:check` run failed because pre-reset reports referenced prompts that had been moved out of the active completed and blocked queues. Those old reports were archived, then `npm run agent:check` was rerun and passed with warnings only about pending prompt playtest language being Brandon-only.

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- The current playable source still reflects the previous implementation direction until prompt `001` updates the prototype shell.
- Pending prompt playtest notes are informational for Brandon and should not be treated as required interactive browser automation.

## Risk Level

Medium. The reset touches source-of-truth docs and queue bookkeeping, but avoids game source changes.

## Next Recommended Action

Restart the one-prompt workflow on `001-minimal-ps1-3d-prototype-shell.md`.
