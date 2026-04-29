# 022 - Warning Clarity Pass

## Goal

Make heat, hydration, and quad danger states clearer before the player reaches collapse.

## Context

The game has resource meters, shell alert states, pressure chips, and failure states. Prompt 017 found that critical feedback still depends on dense HUD reading and could use stronger escalation.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Improve visual and text warning states for heat, hydration, and quad damage.
- Make near-collapse states more explicit in the status line or HUD.
- Preserve existing resource mechanics and thresholds unless a tiny display threshold adjustment is needed.
- Keep warnings serious and SUC-coded.
- Keep the HUD portrait-safe.

## Out of Scope

- No balance overhaul.
- No new resource systems.
- No audio work in this prompt.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- Heat, hydration, and quad danger states are easier to distinguish.
- The player gets clear warning before collapse.
- Existing failure and report behavior still works.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
