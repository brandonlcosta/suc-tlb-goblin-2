# Prompt Generation

The queue prompt generator creates pending prompts only. It does not implement game features, does not edit `src/`, does not move prompts to `completed` or `blocked`, and does not run `npm run goblin:main` or `npm run agent:one`.

## Command

```bash
npm run prompt:generate
```

Optional deterministic date for reports:

```bash
npm run prompt:generate -- --date 2026-04-29
```

After generation, validate the ledger:

```bash
npm run agent:check
```

`npm run prompt:generate` only generates a queue prompt. It does not consume a
prompt, run `npm run goblin:main`, run `npm run agent:one`, commit, push, or
implement game features.

## Generate And Run One Direct-Main Step

Use the combined command when the sandbox should create one new prompt and then
immediately run one direct-main goblin build step:

```bash
npm run goblin:generate-and-run
```

The combined command:

1. Requires a clean worktree.
2. Checks out `main`.
3. Pulls latest `origin main` with `--ff-only`.
4. Runs `npm run agent:check`.
5. Runs `npm run prompt:generate`.
6. Verifies prompt generation created exactly one pending prompt and only touched
   allowed prompt-generation files.
7. Runs `npm run agent:check` again.
8. Commits the generated prompt and generator report.
9. Pushes `main`.
10. Runs exactly one `npm run goblin:main` step.

The prompt commit message is:

```txt
Generate STLB prompt <number>: <slug>
```

For scheduled automation, prefer:

```bash
npm run goblin:generate-and-run -- --only-if-queue-low
```

With this flag, the command generates only when there are 3 or fewer pending
prompts. If the queue already has more than 3 pending prompts, it exits cleanly
without generating and without running `goblin:main`.

## What It Writes

Each successful run writes exactly one new implementation prompt to:

```txt
prompts/pending/NNN-short-title.md
```

It also writes a queue-generation report to:

```txt
reports/runs/
```

The generated prompt becomes normal queue work. `npm run goblin:main` can consume it later only when it is the oldest pending prompt. The generator itself must never implement the prompt it creates.

When `npm run goblin:generate-and-run` is used, the generated prompt is committed
before the direct-main step starts. The later `goblin:main` run still consumes the
oldest numbered file in `prompts/pending/`, not necessarily the prompt that was
just generated. This is intentional FIFO queue behavior.

## Analysis Sources

The generator reviews:

- `GAME.md`
- `ROADMAP.md`
- `docs/BACKLOG.md`
- `docs/MECHANICS_SPEC.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/PROMPT_PIPELINE.md`
- recent files in `reports/runs/`
- recent files in `reports/playtests/`
- screenshot folders
- current files in `src/`
- prompt ledger state

## Screenshots

Screenshots should go in one of these folders before prompt generation:

```txt
reports/playtests/screenshots/
reports/screenshots/
.goblin/screenshots/
```

Use playtest screenshots to steer small prompts toward visible problems: trail readability, HUD clarity, camera framing, PS1 atmosphere, warning feedback, and finish/report clarity.

## Numbering

The generator scans prompt numbers across:

```txt
prompts/pending/
prompts/completed/
prompts/blocked/
prompts/archive/
```

It creates the next available number after the highest number found. If `011` already exists anywhere in those ledgers, it tries `012`, and so on.

## Game Studio Use

Use the Game Studio guidance as a lightweight direction check, not as an implementation mandate. For this project, generated prompts should stay aligned with the browser game core loop:

- third-person downhill feel
- trail and camera readability
- PS1 atmosphere
- HUD clarity
- heat, hydration, quad, cooling, and crew decisions
- finish/report clarity

Do not use prompt generation to start broad redesigns, add services, add accounts, add multiplayer, add real maps, add GPX/Strava, or grow the game outside Cal Street Heat Drop.

## Reviewing A Generated Prompt

Before allowing automation to consume a generated prompt, check that:

- it has the required `Implementation Prompt` structure
- it is one small implementation goal
- it improves the next playtest
- it does not duplicate an existing pending prompt
- it does not ask for source, infrastructure, or external service changes outside the goal
- `npm run agent:check` passes

If the prompt is not useful, edit or remove it manually before running implementation automation.
