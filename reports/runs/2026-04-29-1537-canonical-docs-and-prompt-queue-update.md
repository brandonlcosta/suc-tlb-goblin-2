# Run Report: Canonical Docs and Prompt Queue Update

Date: 2026-04-29

## Prompt Consumed

None. This was a direct Brandon-requested docs-only canonical migration and prompt queue update.

## Status

completed

## Summary

Updated the canonical planning docs so the first mission direction is now a PS1-style low-poly Cal Street / Foresthill-inspired downhill canyon survival section with:

- river crossings
- safe/slow water versus fast/risky log choice
- water slowdown and possible small cooling benefit
- steeper downhill sections
- curves and switchbacks
- one short uphill heat check
- second aid station before the final push
- cleaner readable low-poly runner model direction
- simple cleaner animation direction
- PS1 style still locked as the target

This was planning/docs work only. No gameplay implementation was performed.

## Canonical Doc Changes

- Rewrote the design bible around the expanded first-mission identity without making the game bigger than one corridor.
- Updated the roadmap so the new work is staged iteratively instead of all landing in one prompt.
- Expanded the Cal Street mission spec with the new route shape:
  Foresthill start, fast rollout, steeper drop, curves/switchbacks, river/log crossing, short uphill, second aid, final push, finish.
- Added lightweight mechanics guidance for water terrain, log crossing, terrain modifiers, aid effects, and animation feedback states.
- Updated the PS1 style guide with cleaner runner readability, simple animation, river/log visuals, switchback/steep/uphill cues, and aid-station props.
- Updated level design guidance for readable curves, switchbacks, steeper downhill, one short uphill, river/log placement, second aid placement, and final survival pressure.
- Updated audio, playtest, AI rules, BC-OS, repo structure, prompt generation, prompt pipeline, decisions, and backlog docs to match.

## Files Changed

- `GAME.md`
- `README.md`
- `ROADMAP.md`
- `docs\AI_DEVELOPMENT_RULES.md`
- `docs\AUDIO_STYLE_GUIDE.md`
- `docs\BACKLOG.md`
- `docs\BC_OS_INTEGRATION.md`
- `docs\CAL_STREET_HEAT_DROP.md`
- `docs\CODEX_PROMPT_GENERATOR_AUTOMATION.md`
- `docs\DECISIONS.md`
- `docs\LEVEL_DESIGN_GUIDE.md`
- `docs\MECHANICS_SPEC.md`
- `docs\PLAYTEST_CHECKLIST.md`
- `docs\PROMPT_GENERATION.md`
- `docs\PROMPT_PIPELINE.md`
- `docs\PS1_3D_STYLE_GUIDE.md`
- `docs\REPO_STRUCTURE.md`
- `prompts\pending\027-terrain-variation-curves-switchbacks-steeps-uphill.md`
- `prompts\pending\028-river-and-log-crossing-mechanic.md`
- `prompts\pending\029-water-slowdown-and-cooling-tuning.md`
- `prompts\pending\030-foresthill-crew-start-and-second-aid-station.md`
- `prompts\pending\031-finish-line-and-expanded-run-report.md`
- `prompts\pending\032-cleaner-retro-runner-model-and-animation-pass.md`
- `prompts\pending\033-ps1-atmosphere-pass.md`
- `prompts\pending\034-first-balance-pass-after-expanded-mission.md`
- `reports\runs\2026-04-29-1537-canonical-docs-and-prompt-queue-update.md`

## Prompt Queue Changes

Renamed/replaced the active pending prompt focus:

- old `027-run-report-coaching-pass.md` became `027-terrain-variation-curves-switchbacks-steeps-uphill.md`
- old `028-second-balance-pass.md` became `028-river-and-log-crossing-mechanic.md`

Added new pending prompts:

- `029-water-slowdown-and-cooling-tuning.md`
- `030-foresthill-crew-start-and-second-aid-station.md`
- `031-finish-line-and-expanded-run-report.md`
- `032-cleaner-retro-runner-model-and-animation-pass.md`
- `033-ps1-atmosphere-pass.md`
- `034-first-balance-pass-after-expanded-mission.md`

Completed and blocked prompt files were inspected as ledger/history and left unchanged.

## Validation Commands Run

```powershell
npm run agent:check
```

```powershell
$required = @('Goal','Files / Directories to Inspect','Implementation Scope','Out of Scope','Acceptance Criteria','Validation Command','Playtest Note')
Get-ChildItem prompts\pending -File -Filter *.md | Sort-Object Name | ForEach-Object {
  $text = Get-Content -Raw $_.FullName
  foreach ($r in $required) {
    if ($text -notmatch "(?m)^##\s+$([regex]::Escape($r))\b") { throw "$($_.Name) missing $r" }
  }
}
```

```powershell
git status --short
```

```powershell
git diff --name-status -- GAME.md README.md ROADMAP.md docs prompts reports package.json package-lock.json src index.html
```

## Validation Result

Passed for docs-only migration checks.

- Initial `npm run agent:check` passed before edits.
- Pending prompt section check passed for prompts 027 through 034.
- Post-queue `npm run agent:check` passed and reported `Ledger OK`.
- Final post-report `npm run agent:check` passed and reported `Ledger OK`.
- `agent:check` emitted warnings because pending prompts include required playtest-note language; this is expected and not a ledger failure.
- `git diff --name-status` showed the docs and prompt queue files changed by this migration.
- No package/build files were changed by this migration.
- No `src/`, `index.html`, package, or build-config files are changed in the final diff for this migration.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- Build validation was not run because this was docs-only and no gameplay/source files were intentionally changed.
- Completed historical prompts 011 through 026 do not all use the newer prompt-section template. They were left unchanged to preserve run history; the active pending queue now uses the required structure.

## Risk Level

Low. This migration changed planning docs, prompt-generation guidance, active pending prompt files, and this run report only. It did not implement gameplay code, install packages, change build config, edit BC-OS, add assets, add APIs, add accounts, add multiplayer, push, merge, or deploy.

## Next Recommended Prompt

Run `027-terrain-variation-curves-switchbacks-steeps-uphill.md`.
