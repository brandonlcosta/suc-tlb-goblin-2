# Implementation Prompt: Decision Recap Run Report

## Context

Cal Street Heat Drop now has the core descent loop, Foresthill crew choices, pace/brake/cooling controls, route-zone markers, risk lanes, and a finish/failure run report. The current report shows outcome stats, but it does not yet tell the player how they drove the run: how much they used risky paces, whether they controlled the descent, when ice was used, or which line choices dominated.

This matters because the game is becoming a tactical downhill survival prototype. The player needs post-run feedback that connects their choices to the result so the next attempt is not just "try again," but "control earlier, brake more, use ice before critical heat, or stop living on the exposed outside line."

## Goal

Add a compact decision recap to the run report that summarizes key player choices from the descent.

## Why This Matters

The strongest loop in this game is replaying Cal Street with better restraint. A decision recap makes the run report more actionable by showing whether the player actually used Control/Steady/Push/Send, brake/control input, cooling, and risk lanes in a way that explains the outcome.

## Scope

Implement:

- Track active-descent time spent in each pace mode.
- Track brake/control hold time during active descent.
- Track cooling use count plus the first cooling-use moment as progress percent and heat value.
- Track time spent in the main risk-lane categories already present in the game.
- Add a compact run-report section or report stat tiles for pace mix, brake/control time, ice timing, and primary line choice.
- Add one short discipline note or verdict detail that reacts to obvious patterns such as heavy Send use, no braking, late/no ice, or excessive exposed/fast-line time.

## Out of Scope

Do not implement:

- new gameplay mechanics, new resources, or balance retuning
- persistent history, saved runs, leaderboards, accounts, or external services
- new screens outside the existing run report overlay
- charts, graphs, or large report redesigns
- changes to prompt automation, package scripts, build scripts, or BC-OS

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
