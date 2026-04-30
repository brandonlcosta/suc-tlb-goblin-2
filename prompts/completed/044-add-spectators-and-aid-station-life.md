# Prompt 044 — Add Spectators and Aid Station Life

## Goal

Add simple spectators and aid-station atmosphere so the course feels like an event.

Use lightweight visual actors and props.

## Files / Directories to Inspect

- `GAME.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `src/`

## Implementation Scope

Add simple environmental life at appropriate sections:

- spectators in a few spots
- crew / volunteer silhouettes at aid areas
- aid station props
- flags / tape / signs
- coolers, tables, jugs
- small visual activity cues
- simple clapping/waving posture if easy

Spectators can be simple:

- low-poly figures
- billboard-like figures if needed
- limited idle animation if easy
- a few clustered event zones, not everywhere

Prioritize:

- Foresthill start / crew zone
- second aid station
- river crossing
- one switchback overlook if appropriate

The goal is event atmosphere, not crowd simulation.

## Out of Scope

- no full crowd AI
- no voice acting requirement
- no giant spectator density
- no dynamic event system
- no cutscenes
- no pathfinding spectators
- no auto-push
- no auto-merge
- no auto-deploy

## Acceptance Criteria

- aid station areas feel more alive
- at least a few spectator / event-presence moments exist
- atmosphere improves without cluttering gameplay
- performance remains acceptable
- build passes

## Validation Command

```bash
npm run build
```

## Playtest Note

Run through start and aid-station sections and judge whether they now feel like an actual race environment.
