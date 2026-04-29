# Implementation Prompt: Risk Lane Line Choice

## Context

Cal Street Heat Drop now has the core downhill survival loop, route-zone cues, a PS1-style portrait scene, crew choices, finish/report flow, and a thumb-friendly touch control deck. The player can steer left and right, but the current line choice is still mostly positional: the game has exposed, technical, and shade zones, yet the trail does not clearly ask the player to choose between fast, shaded, rocky, or safer lines moment to moment.

## Goal

Add a small visible risk-lane system that makes steering choices readable and consequential during the active descent.

## Why This Matters

The game fantasy depends on downhill restraint and line choice, not just picking a pace mode. If the player can see that one side of the trail is exposed and fast while another side is shaded or rocky, the next playtest can evaluate tactical running decisions instead of only meter tuning.

## Scope

Implement:

- Add a few authored trail lane cues in existing route zones, such as shaded strips, rocky strips, exposed fast strips, or safer center strips.
- Make lane cues visible in the PS1 low-poly style without blocking the runner, touch controls, or route markers.
- Apply lightweight effects when the runner occupies those lanes, such as less heat in shade, more quad damage on rocky trail, or more heat/speed pressure on exposed fast trail.
- Surface the current lane cue through compact HUD/status text so players understand why heat or quads are changing.

## Out of Scope

Do not implement:

- Procedural terrain, branching routes, a full hazard collision system, or a new map editor
- New resources, new missions, route intel upgrades, GPX, Strava, accounts, multiplayer, or external APIs
- Broad balance retuning beyond the small lane-effect constants needed for this feature
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
