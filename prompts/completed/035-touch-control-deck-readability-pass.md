# Implementation Prompt: Touch Control Deck Readability Pass

## Context

Cal Street Heat Drop now has a recognizable portrait-first loop: title, route intel, crew start, downhill survival, river/log choice, short uphill, second aid, finish/failure, and run report. The pending queue will next improve runner readability, PS1 atmosphere, and first-pass balance.

The in-run touch deck still carries some prototype/debug flavor, including keyboard-key copy and dense button text. For a phone-first game, the player should understand pace risk, steering, braking, and ice state at a glance without mentally translating desktop controls.

## Goal

Make the active descent touch control deck read as a mobile-first tactical control surface while preserving the existing input behavior and game systems.

## Why This Matters

The control deck is where the player makes the core downhill survival decisions. If pace, brake, steering, and ice states feel like debugging controls, the heat/hydration/quad loop becomes harder to read and less tense. Clearer touch affordances should improve the next playtest without adding new mechanics.

## Scope

Implement:

- Replace visible keyboard/debug copy in the touch controls with concise mobile-first labels that explain tactical intent.
- Improve visual hierarchy and active/disabled state feedback for pace, steering, brake, and ice controls in portrait layout.
- Keep the control deck from covering critical runner, trail, hazard, or route-preview information on narrow mobile viewports.
- Preserve existing keyboard fallback behavior if present, but do not foreground keyboard hints in the touch UI.

## Out of Scope

Do not implement:

- a new input system or drag-steering rewrite
- new pace, braking, cooling, heat, hydration, quad, crew, aid, river, or log mechanics
- a broad HUD/report/title/crew redesign
- new packages, build scripts, automation changes, external services, accounts, multiplayer, real maps, GPX, Strava, or external APIs

## Acceptance Criteria

- [ ] Build passes
- [ ] Prompt ledger remains valid
- [ ] Feature is visible or testable
- [ ] The change improves game feel, clarity, loop, or player decision-making
- [ ] No unrelated systems are added

## Validation

Run:

`npm run build:goblin`
`npm run agent:check`

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.
