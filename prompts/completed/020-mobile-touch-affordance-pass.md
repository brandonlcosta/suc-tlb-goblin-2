# 020 - Mobile Touch Affordance Pass

## Goal

Improve the existing touch control deck so steering, braking, pace, and ice are easier to understand and use on a portrait phone.

## Context

Prompt 017 found that touch controls exist but still read like a prototype: numbered pace buttons, small action labels, and discrete left/right controls. This pass should improve affordance without changing the underlying game systems.

## Files / Directories to Inspect

- `GAME.md`
- `docs/PLAYTEST_CHECKLIST.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `index.html`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Make pace buttons clearer as Control, Steady, Push, and Send while preserving keyboard hints if useful.
- Improve steering and brake labels for touch-first play.
- Make ice/cooling status more prominent when a charge is ready.
- Keep controls hidden outside active descent.
- Preserve existing input mechanics and keyboard fallback.
- Keep layout stable on narrow portrait screens.

## Out of Scope

- No gesture rewrite unless it is very small and low risk.
- No virtual joystick.
- No dependency additions.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- Touch controls communicate their purpose without relying on keyboard numbers.
- The active pace and held controls remain visually obvious.
- The ice button is visibly ready, active, or spent.
- The controls do not cover the whole trail view.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
