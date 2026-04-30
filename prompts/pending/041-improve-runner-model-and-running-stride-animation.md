# Prompt 041 — Improve Runner Model and Running Stride Animation

## Goal

Make the player character look better and move more like an actual runner while staying retro and lightweight.

The runner should be more readable, more athletic, and more believable in motion.

## Files / Directories to Inspect

- `GAME.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

Improve the player runner presentation with:

- cleaner low-poly body proportions
- better silhouette
- more readable torso / leg / arm structure
- a simple running stride animation
- basic arm swing
- basic leg cycle
- basic downhill lean
- braking / restraint posture if practical
- optional fatigue wobble or cooked form if lightweight

The result should still feel retro:

- low-poly
- simple rig if used
- simple animation loops
- no realism chase

Movement readability matters more than fidelity.

## Out of Scope

- no complex animation tree
- no mocap pipeline
- no character customization
- no wardrobe system
- no realistic skin/shader work
- no high-poly asset pipeline
- no imported paid character assets
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- runner is visually cleaner and easier to read
- running stride is visible
- movement looks more like running than a rigid placeholder
- downhill/braking feel more readable if implemented
- animation does not break controls or camera
- build passes

## Validation Command

```bash
npm run build
```

## Playtest Note

Watch the runner during steady pace, push pace, and restraint. Confirm the body motion reads clearly.
