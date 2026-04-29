# Implementation Prompt: Trail Zone Readability Markers

## Context

The current game direction depends on players reading exposed, shaded, and technical parts of the descent before they commit to pace, braking, and line choices. The source already has early exposure and technical pressure signals, and the queue is scheduled to add cooling, crew, finish/report, atmosphere, and balance before this prompt is reached. The next useful playtest improvement is making those route-state changes more legible instead of adding another system.

## Goal

Make shade, exposed, and technical trail zones readable early enough for the player to adjust pace, braking, and line choice.

## Why This Matters

The downhill survival loop only works if players can see trouble coming. Clear zone reads turn heat and quad pressure from invisible math into decisions the player can blame, learn from, and replay.

## Scope

Implement:

- Add a small route-zone descriptor list for the current mission using existing progress bands where possible.
- Show the current zone and the next major zone in the existing HUD or status line.
- Add lightweight low-poly or color-coded transition markers for exposed, shade, and technical sections.
- Keep resource formulas mostly intact, changing only tiny labels or hooks needed to connect the zone readout.

## Out of Scope

Do not implement:

- No new mission, open world, branching route network, real map, GPX, Strava, or external API.
- No broad renderer rewrite, new dependency, large asset pack, or realistic graphics pass.
- No new resource system, crew overhaul, cooling overhaul, or run-report redesign.

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
