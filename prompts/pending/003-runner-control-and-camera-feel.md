# Prompt 003 — Runner Control and Camera Feel

## Goal

Add basic player control and make movement feel responsive.

## Files / Directories to Inspect

- `GAME.md`
- `src/`

## Implementation Scope

- Add left/right keyboard control with A/D and arrow keys.
- Keep auto-forward movement.
- Prevent the runner from leaving the trail bounds.
- Add simple camera/scroll feel if needed.
- Make controls responsive.

## Out of Scope

- No mobile controls.
- No controller support.
- No complex physics.
- No stamina system yet.

## Acceptance Criteria

- A/D and arrow keys work.
- Runner stays within playable area.
- Auto-forward movement still works.
- Restart resets position.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Move left and right continuously and confirm it feels understandable and stable.
