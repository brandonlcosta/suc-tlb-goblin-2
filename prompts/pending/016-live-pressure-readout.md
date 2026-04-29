# Implementation Prompt: Live Pressure Readout

## Context

Cal Street Heat Drop now has route intel, a Foresthill crew setup, portrait touch controls, pace modes, cooling, risk lanes, route zone markers, survival resources, and a decision recap in the run report. During the active descent, the HUD shows resource values and status text, but the player still has to infer the immediate cost of their current pace, braking, lane, and cooling choices from numbers that change over time.

This prompt exists to make the current decision pressure readable while the player is still running, before the post-run recap explains what happened.

## Goal

Add a compact live pressure readout that tells the player how the current descent choice is affecting heat, hydration, and quad risk.

## Why This Matters

The core game question is how much speed the player can take before heat, hydration, and quad damage destroy the run. A live pressure readout helps players connect choices to consequences in the moment, making braking, cooling, pace, and line choice feel more tactical without adding new mechanics.

## Scope

Implement:

- Add one portrait-safe HUD pressure strip or compact status module visible during active descent that summarizes current heat, hydration, and quad pressure.
- Derive the readout from existing state such as pace mode, speed, braking, cooling, route zone, and current risk lane; do not retune the underlying resource formulas.
- Use short PS1 tactical labels such as `HEAT ++`, `H2O -`, `QUAD +++`, `ICE RELIEF`, or `BRAKE SAVING LEGS` so the message fits on mobile.
- Style pressure severity with existing HUD colors/data-state patterns while keeping the trail, runner, and touch controls readable.
- Ensure the readout resets cleanly across route intel, crew, restart, finish, and failure states.

## Out of Scope

Do not implement:

- New resource mechanics or balance changes
- New hazards, new crew actions, or new route zones
- A report overhaul beyond any minimal text needed for consistency
- Audio, browser-only effects, external assets, or new dependencies
- Broad source refactors or package/script changes

## Acceptance Criteria

- [ ] Build passes
- [ ] Prompt ledger remains valid
- [ ] Feature is visible or testable
- [ ] The change improves game feel, clarity, loop, or player decision-making
- [ ] No unrelated systems are added

## Validation

Run:

`npm run build:goblin`
`npm run agent:check`

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.
