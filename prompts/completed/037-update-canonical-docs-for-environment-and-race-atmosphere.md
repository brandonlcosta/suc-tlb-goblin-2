# Prompt 037 — Update Canonical Docs for Environment and Race Atmosphere

## Goal

Update the canonical planning docs so the game bible, roadmap, mission docs, style guide, level design guide, and active prompt queue reflect the next phase of development:

- more detailed retro runner character
- readable running stride animation
- visible river/water sections
- modeled log crossings
- switchbacks and more realistic curved trail geometry
- replacement of arches with flags / course markers
- other runners
- spectators
- more detailed trail visuals
- more advanced retro graphics features

This is a docs-only planning pass.

Do not implement gameplay code.

## Files / Directories to Inspect

- `GAME.md`
- `ROADMAP.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `docs/DECISIONS.md`
- `docs/BACKLOG.md`
- `prompts/pending/`

## Implementation Scope

Update docs so they clearly support:

- runner model readability improvements
- running stride animation
- downhill lean / braking posture
- visible river sections
- visible log crossings
- switchbacks and curved trail
- flags, ribbon, and trail markers instead of arches
- other runners as ambient race actors
- spectators as environmental atmosphere actors
- more realistic trail detail while staying retro
- more advanced graphics polish while staying low-poly

Also update the prompt queue to align with this new direction.

## Out of Scope

- no gameplay code
- no `src/` changes
- no asset imports
- no dependency changes
- no second mission
- no BC-OS edits
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- canonical docs reflect the new visual/environment direction
- prompt queue is updated to match
- arches are removed from the intended art direction
- new visual goals remain PS1-style / low-poly, not modern realism
- no gameplay code is changed
- a run report is written

## Validation Command

Docs-only validation:

```bash
git diff --stat
git diff --name-only
```

Confirm:
- no `src/` files changed
- no package/build files changed
- prompt queue order is coherent
- docs are internally consistent

## Playtest Note

Not applicable. Docs-only prompt.
