# Prompt 039 — Model Switchbacks, Curves, and Varied Trail Geometry

## Goal

Improve the trail layout so it feels more like a real descent and less like a simple corridor.

Add curved segments, more natural turns, and at least one readable switchback sequence.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `src/`

## Implementation Scope

Update the first mission geometry to include:

- more natural trail curvature
- at least one switchback section
- better visible trail flow
- readable entry and exit lines
- more varied trail width where appropriate
- steeper downhill pockets and recovery segments
- a short uphill interruption if it is not already represented

Switchbacks should feel intentional and readable, not maze-like.

If the current mission is generated from segments or zone configs, prefer updating those configs rather than hardcoding scattered geometry.

## Out of Scope

- no open world
- no full terrain editor
- no procedural world generation
- no exact real-world trail recreation
- no second mission
- no big engine rewrite
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- trail is not mostly straight
- at least one switchback section exists
- downhill route reads more like a real trail
- turns are playable and readable
- braking/restraint is useful in at least one turn sequence
- build passes

## Validation Command

```bash
npm run build
```

## Playtest Note

Do several runs and confirm the trail now has actual route-reading and braking moments.
