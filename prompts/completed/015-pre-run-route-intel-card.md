# Implementation Prompt: Pre-Run Route Intel Card

## Context

Cal Street Heat Drop now has the core downhill loop, crew choices, touch controls, risk lanes, route-zone cues, finish state, and a decision-focused run report. The current player flow starts directly in the Foresthill crew overlay, so the player does not get the route intel moment described in the game bible before making crew decisions.

This prompt exists to frame the mission before the crew choice, without adding a large title screen, menu system, or tutorial.

## Goal

Add a compact portrait-safe route intel card that appears before the crew zone and gives the player the mission threat, terrain read, and strategy cue before they choose crew support.

## Why This Matters

The game is about tactical restraint before a dangerous downhill section. A route intel card gives the player a reason to care about ice, hydration, braking, and line choice before the run starts, making the crew choices feel less arbitrary and improving the first minute of the next playtest.

## Scope

Implement:

- A pre-run route intel overlay shown before the existing crew overlay
- Mission-specific intel text for Cal Street Heat Drop: threat, shade reliability, crew access, and strategy
- One large touch-friendly command to continue from route intel into the existing crew zone
- Minimal state wiring so restart returns to route intel first, then crew, then descent
- Portrait-safe styling that preserves the PS1 tactical HUD tone

## Out of Scope

Do not implement:

- A full title screen or main menu
- Settings, save slots, route selection, or multiple missions
- New mechanics, balance changes, or source refactors unrelated to this flow
- Control tutorials, keyboard shortcut panels, or explanatory UI beyond route intel
- External services, maps, GPX, Strava, accounts, multiplayer, or online features

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
