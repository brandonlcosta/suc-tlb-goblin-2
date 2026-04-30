# Implementation Prompt: Brake Control Feedback Pass

## Context

Cal Street Heat Drop now has a complete portrait-first downhill loop with route intel, crew and second aid decisions, terrain zones, risk lanes, river/log choice, PS1 atmosphere, sparse race actors, spectators, and recent balance/readability tuning. Braking already reduces speed pressure, heat gain, and quad damage, but from the player perspective it can still read mostly as "go slower" rather than "protect the run before the trail takes payment."

The next small improvement should make restraint feel intentional and visible during steep drops, switchbacks, the log approach, and the final push.

## Goal

Make the brake/control input communicate that it is actively protecting the runner, especially quads and heat, without changing the core movement model.

## Why This Matters

The central game decision is whether to send the downhill or control it. If braking does not feel tactically rewarding, players may miss the main survival lesson and read failures as arbitrary resource drain instead of the result of overcooking the descent.

## Scope

Implement:

- Add clear in-run feedback when braking is held, such as a HUD status, pressure chip state, or touch-control state that says restraint is reducing heat and quad pressure.
- Make the feedback stronger or more specific in high-risk zones where restraint matters most: steep drop, switchbacks, river/log approach, and final push.
- Reuse existing runner posture, HUD, touch-control, and status systems where possible so the change stays lightweight and readable in portrait mode.
- Add or adjust one short run-report coaching line that recognizes useful braking/restraint or calls out not braking enough on dangerous downhill sections.

## Out of Scope

Do not implement:

- new braking physics, new pace modes, or broad balance retuning
- new screens, tutorials, or long explanatory overlays
- new audio systems or asset pipelines
- new terrain, new aid-station choices, or new race actors
- external services, maps, accounts, multiplayer, GPX, or Strava

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
