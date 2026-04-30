# Prompt 042 — Add Real Trail Surface and Environment Detail

## Goal

Make the trail and surrounding environment feel more like an actual dirt trail in a canyon descent.

The current presentation should gain more environmental detail without losing retro clarity.

## Files / Directories to Inspect

- `GAME.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `src/`

## Implementation Scope

Improve trail/environment visuals with some combination of:

- more believable dirt trail coloring
- texture or color variation along the trail
- trail edges / shoulders
- rocks and embedded stones
- brush / shrubs / grass clumps
- small trees
- stakes, trail signs, ribbon
- worn path feel
- uneven trail sections
- dust-color variation
- edge drop-offs or berm-like shape cues where appropriate
- simple background canyon forms

Keep the style low-poly and readable.

This is not about photorealism.
It is about “this looks like a real trail” in a retro game language.

## Out of Scope

- no giant asset library
- no realistic foliage system
- no open-world biome work
- no texture-resolution arms race
- no terrain rewrite unless small/localized
- no new gameplay systems unless purely required for visual placement
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- trail reads more like a dirt trail and less like a flat game strip
- environment has more depth and detail
- route remains readable during gameplay
- art remains retro / low-poly
- performance remains acceptable
- build passes

## Validation Command

```bash
npm run build
```

## Playtest Note

Run the mission and judge whether the ground and trail edges now feel more like a place.
