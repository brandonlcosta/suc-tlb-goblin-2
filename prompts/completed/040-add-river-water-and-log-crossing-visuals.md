# Prompt 040 â€” Add River, Water, and Log Crossing Visuals

## Goal

Add visible river crossing content so the mission shows actual water and log crossing visuals.

The current game direction calls for river crossings. The build should now visually represent them.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `src/`

## Implementation Scope

Add a river crossing section with visible retro-styled water.

Include:

- visible water surface
- visible river banks / crossing area
- at least one log crossing path
- visual distinction between water route and log route
- water slowdown behavior if not already present
- simple visual feedback for entering water
- optional simple cooling feedback if supported by current systems

Water can be stylized and low-poly:

- flat shaded
- animated texture scroll
- simple shimmer
- simple splash effect
- darker/lighter bands to show depth

Logs should be readable and clearly intentional as a crossing route.

The river/log section should integrate into the current mission flow and not feel like a random obstacle.

## Out of Scope

- no realistic water simulation
- no swimming system
- no physics-heavy buoyancy
- no complicated current simulation
- no large water tech rewrite
- no platformer spam
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- river crossing is visible and recognizable
- log crossing is visible and recognizable
- player can understand the faster/riskier vs slower/safer crossing choice
- water looks like water in-game
- water slows the player or clearly affects movement if that mechanic exists
- build passes

## Validation Command

```bash
npm run build
```

## Playtest Note

Run through the crossing several times and confirm it reads clearly at gameplay speed.
