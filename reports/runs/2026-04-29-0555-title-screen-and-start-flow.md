# Run Report: Title Screen And Start Flow

Date: 2026-04-29

## Prompt Consumed

- `prompts/pending/018-title-screen-and-start-flow.md`

## Status

completed

## Summary

Added a portrait-friendly title/start overlay before route intel. The first screen now establishes `SUC: THE LONG BURN`, `CAL STREET HEAT DROP`, and a short tone line before the player taps a large start button.

The start button advances into the existing route intel overlay, route intel still advances to crew, and restart now resets the run back to the title screen. Space key handling was narrowed so focused buttons can still activate outside descent while the existing cooling keyboard fallback remains available during descent.

## Files Changed

- `index.html`
- `src/main.ts`
- `src/styles/base.css`
- `prompts/completed/018-title-screen-and-start-flow.md`
- `prompts/pending/018-title-screen-and-start-flow.md`
- `reports/runs/2026-04-29-0555-title-screen-and-start-flow.md`

## Validation Commands Run

```bash
npm run agent:check
npm run build:goblin
npm run agent:check
npm run agent:check
git diff --check
```

## Validation Result

Passed.

- Initial `npm run agent:check` passed with `018-title-screen-and-start-flow.md` as the oldest pending prompt.
- `npm run build:goblin` passed.
- Post-move `npm run agent:check` passed with prompt `018` completed and prompt `019` as the next pending prompt.
- Final post-report `npm run agent:check` passed with the ledger still OK.
- `git diff --check` passed with only existing line-ending normalization warnings from Git for touched source files.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- No browser or manual UI playtest was performed during automation.
- PowerShell `Move-Item` was denied for moving prompt `018`, so the prompt was copied to completed and removed from pending with the patch tool.

## Risk Level

Low. The change is limited to the title/start overlay and state flow around the existing route intel, crew, descent, and report screens. No package files, build scripts, workflows, automation files, dependencies, BC-OS files, deployment files, external APIs, accounts, or multiplayer features were changed.

## Next Recommended Prompt

Run `prompts/pending/019-pause-and-restart-confirmation.md`.
