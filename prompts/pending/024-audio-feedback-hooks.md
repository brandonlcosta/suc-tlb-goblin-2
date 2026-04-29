# 024 - Audio Feedback Hooks

## Goal

Add minimal, silent-safe audio feedback hooks for important run events without adding assets or dependencies.

## Context

Prompt 017 found that the game has no audio, so critical events depend entirely on visual feedback. This pass should add small built-in audio cues only if they can be implemented safely without new packages.

## Files / Directories to Inspect

- `GAME.md`
- `docs/AUDIO_STYLE_GUIDE.md`
- `reports/playtests/2026-04-29-playtest-and-next-roadmap.md`
- `src/main.ts`
- `src/styles/base.css`

## Implementation Scope

- Add a tiny audio helper using built-in Web Audio if appropriate.
- Gate audio behind a user interaction so autoplay policies are respected.
- Add subtle cues for ice use, high heat warning, finish, and collapse.
- Provide a silent/no-audio fallback if Web Audio is unavailable.
- Keep cues minimal, low-fi, and non-musical.

## Out of Scope

- No audio files.
- No licensed music.
- No dependency additions.
- No settings menu unless a tiny mute toggle is necessary and low risk.
- No package, script, workflow, or automation changes.

## Acceptance Criteria

- Audio code does not throw when unavailable.
- Cues are triggered only by existing game events.
- The game remains playable silently.
- Build validation passes.

## Validation Command

```powershell
npm run build:goblin
```
