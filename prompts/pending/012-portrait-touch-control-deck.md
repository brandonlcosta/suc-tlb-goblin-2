# Implementation Prompt: Portrait Touch Control Deck

## Context

Cal Street Heat Drop now has the core downhill loop: third-person runner, route zones, heat, hydration, quad damage, pace modes, braking, cooling, crew choices, finish state, and a run report. Recent source review shows the descent is still controlled primarily through keyboard input after the crew zone. That leaves the phone-first version weak because steering, braking, pace changes, and ice use are not all available as thumb-friendly on-screen controls during the run.

## Goal

Add a compact portrait mobile touch control deck for the active descent.

## Why This Matters

The game bible makes portrait touchscreen play the primary target. The downhill survival loop only becomes testable on a phone when the player can steer, brake, change pace, and use ice without a keyboard. This should make the next manual playtest focus on feel and decision-making instead of missing controls.

## Scope

Implement:

- Add on-screen touch controls for left/right steering, hold-to-brake/control, pace mode selection, and ice/cooling use.
- Wire the controls into the existing input, pace, and cooling functions while preserving the keyboard fallback.
- Show clear active/pressed states for braking, selected pace, and ice readiness without covering the runner or critical trail preview.
- Hide, disable, or de-emphasize the descent controls during the crew overlay and run report so the overlays remain tappable.

## Out of Scope

Do not implement:

- New mechanics, new resources, or balance retuning
- New missions, route branches, maps, GPX, Strava, accounts, multiplayer, or external APIs
- A broad HUD redesign or source refactor beyond the touch-control work
- Manual browser playtesting inside the automation run

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
