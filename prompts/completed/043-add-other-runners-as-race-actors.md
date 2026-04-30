# Prompt 043 — Add Other Runners as Race Actors

## Goal

Add a small number of other runners so the world feels like a race instead of a solo test course.

These should be lightweight race actors, not full complex AI competitors.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `src/`

## Implementation Scope

Add a limited number of runner actors on course.

Suggested approach:

- a few visible runners ahead or behind
- simple movement logic
- simple lane / path following
- simple low-poly runner shape
- no complex collision required unless easy and safe
- no deep pack simulation

Other runners should:

- visually read as runners
- move in a race-like way
- help the world feel alive
- not break the player's route
- not create unfair obstacles

Optional lightweight behavior:

- getting passed
- passing the player
- different paces
- occasional small spacing shifts

## Out of Scope

- no full racing AI system
- no networking
- no collisions if too complex
- no full placement/split simulation
- no voice systems
- no named NPC roster
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- at least a few other runners appear on course
- they move convincingly enough to sell race atmosphere
- they do not badly interfere with the player
- performance remains acceptable
- build passes

## Validation Command

```bash
npm run build
```

## Playtest Note

Run the mission and confirm the other runners make the course feel more alive rather than cluttered.
