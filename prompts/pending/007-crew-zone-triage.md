# Prompt 007 — Crew Zone Triage

## Goal

Add the first SUC crew interaction.

## Files / Directories to Inspect

- `GAME.md`
- `docs/FORESTHILL_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `src/`

## Implementation Scope

- Add a visible crew zone in the mission.
- Show an interaction prompt when the player reaches it.
- Add a simple crew choice menu.
- Let the player pick up to 3 actions.
- Suggested actions:
  - refill bottles
  - ice bandana
  - water dump
  - grab gels
  - leave now
- Actions should affect hydration, heat, ice, or time.
- Add crew flavor text.

## Out of Scope

- No full crew character system.
- No inventory.
- No voiced dialogue.
- No multiple crew zones.

## Acceptance Criteria

- Crew zone appears.
- Player can interact with crew.
- Choices affect the run.
- Choices cost time or create tradeoff.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Reach crew, choose different actions over multiple runs, and verify outcomes change.
