# Prompt 045 — Add Advanced Retro Graphics Polish

## Goal

Improve the game's visual richness and atmosphere using lightweight advanced retro graphics features.

The target is a better-looking retro game, not a realism pivot.

## Files / Directories to Inspect

- `GAME.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `src/`

## Implementation Scope

Add a selective polish pass using lightweight features such as:

- better fog tuning
- stronger canyon lighting mood
- water shimmer / movement
- simple splash effects
- dust puffs on trail
- subtle heat shimmer
- better shadow cues if lightweight
- improved color contrast for trail readability
- horizon / background depth improvement
- small material polish on terrain or props
- optional mild PS1-style render treatment if already supported

Keep the visual direction:

- low-poly
- retro
- performant
- readable in motion

## Out of Scope

- no modern realism shaders
- no heavy post-processing stack
- no ray tracing
- no huge rendering overhaul
- no giant asset imports
- no visual changes that hurt gameplay readability
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- the game looks materially better
- water, trail, and atmosphere read more clearly
- performance remains acceptable
- style remains retro
- route and runner remain readable
- build passes

## Validation Command

```bash
npm run build
```

## Playtest Note

Compare before/after screenshots and judge whether the game feels more distinct and more alive.
