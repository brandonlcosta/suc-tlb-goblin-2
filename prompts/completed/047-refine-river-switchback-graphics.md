# Refine River Crossing and Switchback Graphics

## Goal

Improve readability of the trail graphics in the switchback and river crossing sections. The river crossing should read as canyon water with a safe water line and a faster log bridge line, and the switchback section should clearly show an S-shaped trail path in the existing low-poly PS1 style.

## Files / Directories to Inspect

- `src/`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- recent reports in `reports/runs/`

## Implementation Scope

- Refine existing visual geometry and materials for the river crossing.
- Add or improve visible water surface cues.
- Add or improve a modeled log bridge across the river.
- Improve S-shaped switchback trail graphics so the route remains readable in portrait view.
- Preserve existing mechanics and interaction behavior unless a tiny visual hook is required.

## Out of Scope

- Do not add new dependencies.
- Do not add real maps, GPX, external APIs, servers, accounts, or multiplayer.
- Do not add complex water physics.
- Do not create platformer-style log spam.
- Do not rewrite movement, camera, or core game architecture.
- Do not edit BC-OS.

## Acceptance Criteria

- Switchback sections include readable S-shaped trail graphics or visual guide geometry.
- River crossing includes visibly distinct water and a readable log crossing model.
- The safe water line and faster log line remain visually understandable at gameplay scale.
- The game keeps its low-poly PS1 style and portrait readability.
- `npm run build` passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Manual playtest: Not performed; requires Brandon to run locally.
