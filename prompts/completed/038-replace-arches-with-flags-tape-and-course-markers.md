# Prompt 038 — Replace Arches with Flags, Tape, and Course Markers

## Goal

Replace the current arch-style course gates/checkpoints with trail-race-appropriate visual markers.

The course should feel more like a real trail race and less like an arcade checkpoint tunnel.

## Files / Directories to Inspect

- `GAME.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `src/`

## Implementation Scope

Replace or restyle arches with some combination of:

- vertical course flags
- small feather flags
- ribbon / tape strung between stakes
- wooden stakes with course arrows
- aid station signage
- trail marker boards
- caution / route marker signs

Keep the retro low-poly style.

Markers should remain readable from gameplay distance.

If the current code uses arches for trigger volumes, preserve the trigger behavior while changing the visual representation.

## Out of Scope

- no full sponsor system
- no brand licensing
- no full UI redesign
- no crowd system
- no gameplay rebalance unless needed for marker readability
- no new route mechanics
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- visible arches are removed or no longer used as the main course marker
- trail markers are readable in play
- markers fit the low-poly PS1 style
- checkpoints / route guidance still work
- no core gameplay behavior regresses
- build passes

## Validation Command

```bash
npm run build
```

## Playtest Note

Run the mission and confirm the course is still readable without the arches. The course should feel more like a marked trail race.
