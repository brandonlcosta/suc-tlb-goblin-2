# Prompt 001 â€” Minimal PS1 3D Prototype Shell

## Goal

Create the smallest playable 3D prototype shell for `SUC: The Long Burn`.

## Files / Directories to Inspect

- `GAME.md`
- `ROADMAP.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- repo root

## Implementation Scope

- Set up a lightweight browser game if no app exists.
- Prefer Vite + TypeScript + Three.js.
- Create a simple 3D scene.
- Add a low-poly runner placeholder.
- Add a basic third-person camera.
- Add a simple downhill ground/trail placeholder.
- Add minimal HUD text:
  - title
  - mission name: Cal Street Heat Drop
  - progress placeholder
- Add restart support.

## Out of Scope

- No real character model.
- No animation system.
- No heat/hydration yet.
- No crew system.
- No real terrain assets.
- No external APIs.
- No exact maps.

## Acceptance Criteria

- App starts locally.
- 3D scene renders.
- Runner placeholder is visible.
- Third-person camera shows the runner and trail.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Open the game and confirm it reads as a simple third-person low-poly trail scene.

## Blocked Reason

Validation failed after implementation because `npm run build` could not clear the existing `dist/assets` output directory. Vite reported `EPERM, Permission denied` during `prepare-out-dir`. Attempts to move the ignored `dist` output aside and stop the Vite process listening on port `5173` were also denied by the local Windows permission state. See `reports/runs/2026-04-28-1944-001-minimal-ps1-3d-prototype-shell-blocked.md` for the full validation result.
