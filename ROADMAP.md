# SUC: The Long Burn — Roadmap

## Roadmap Philosophy

This game should be built like an ultra.

Do not sprint into a giant open-world mess.

Build the trail one section at a time. Get the core survival loop working. Then make it feel better. Then make it more SUC. Then add depth.

The first target is not “complete game.”

The first target is:

> A playable Foresthill Heat Drop prototype where heat, hydration, pace, ice, and crew decisions already matter.

## Phase 0 — Repo Setup and Design Lock

### Goal

Create the planning foundation and prevent scope creep before coding begins.

### Deliverables

- `GAME.md`
- `README.md`
- `docs/FORESTHILL_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/VISUAL_STYLE_GUIDE.md`
- `docs/AI_DEVELOPMENT_RULES.md`
- prompt queue folders
- report folders

### Done When

- The game direction is clear.
- BC-OS can generate prompts from the docs.
- Codex has strict rules.
- There is no ambiguity that this is mission-based, not open-world.

---

## Phase 1 — Minimal Playable Shell

### Goal

Make the game exist.

### Player Experience

The player opens the game and sees a retro trail-running prototype. A runner moves forward along a trail. The player can steer. There is a clear start and restart flow.

### Features

- browser app
- canvas or lightweight renderer
- pixelated visual baseline
- runner sprite/placeholder
- trail corridor
- auto-forward movement
- basic steering
- basic HUD shell
- restart

### Not Included

- no crew yet
- no route intel yet
- no complex heat model
- no menus beyond bare minimum
- no fancy art

### Done When

- The game starts.
- The runner moves.
- The player has control.
- Build passes.

---

## Phase 2 — Foresthill Heat Drop V0

### Goal

Turn the shell into a real mission.

### Player Experience

The player runs the Foresthill-inspired descent, tries to reach the finish, and begins to feel heat/hydration pressure.

### Features

- mission length/progress bar
- finish line
- lap/segment completion logic
- heat meter
- hydration meter
- simple failure state
- run timer
- route name display
- game-over and restart

### Done When

- The player can start, run, fail, finish, and restart.
- Heat and hydration are visible and affect the run.

---

## Phase 3 — Pace and Resource Strategy

### Goal

Make player decisions matter.

### Player Experience

The player chooses whether to run easy, steady, push, or send. Bad pacing makes heat and hydration spiral.

### Features

- pace modes
- speed changes
- heat gain by pace
- hydration drain by pace
- fatigue meter
- warning states
- first balance constants

### Done When

- “Send” is obviously dangerous.
- “Easy” is safer but slower.
- The player can feel the tradeoff.

---

## Phase 4 — Ice and Cooling

### Goal

Add the signature mechanic.

### Player Experience

The player survives heat by using ice/cooling at the right time. Cooling too early or too late has consequences.

### Features

- ice active meter
- cooling pickups or cooling charges
- spacebar cooling use
- heat reduction / heat gain reduction
- cooling feedback
- heat warning visuals

### Done When

- Cooling feels powerful but limited.
- Heat management becomes the main gameplay hook.

---

## Phase 5 — Crew Zone Triage

### Goal

Make SUC crew matter.

### Player Experience

The player reaches a crew point and has to make fast decisions. Each choice costs time but helps survival.

### Features

- visible crew zone
- interaction prompt
- quick choice menu
- limited action count
- refill hydration
- apply ice
- grab fuel or morale boost
- crew flavor text
- crew efficiency stat

### Done When

- Crew stop changes the outcome of the run.
- The player understands that seconds spent at crew can save the race.

---

## Phase 6 — Retro SUC Identity Pass

### Goal

Make the game feel like SUC, not a generic runner.

### Player Experience

The game has a gritty pixel trail vibe, tactical HUD, heat warnings, and funny/direct SUC flavor.

### Features

- title screen
- route intel card
- SUC-style HUD
- pixel font or pixel-like typography
- dusty/canyon palette
- crew shout text
- verdict lines
- warning text
- basic screen shake / heat shimmer

### Done When

- A screenshot feels like its own game.
- The tone is clear without explanation.

---

## Phase 7 — Run Report and Playtest Loop

### Goal

Make every run produce useful feedback.

### Player Experience

After finishing or failing, the player sees a report that makes them want to try again.

### Features

- finish/fail report
- time
- max heat
- hydration low point
- pace usage
- crew choices
- cause of failure
- verdict
- replay button

### Done When

- The report is readable.
- The report feels like race analysis.
- The next run feels motivated.

---

## Phase 8 — Balance and Fun Pass

### Goal

Make Foresthill Heat Drop worth replaying.

### Player Experience

A good player can finish. A reckless player gets cooked. A cautious player survives but may be slow.

### Features

- tuning constants
- hazard timing
- resource drain adjustments
- mission length adjustments
- better feedback
- maybe first shade/exposure zone pass

### Done When

- Three different play styles produce different outcomes.
- The mission is playable for 3–7 minutes.
- It is fun enough to show someone.

---

## Phase 9 — Second Mission Candidate

### Goal

Only after Foresthill works, add another mission.

### Candidate Missions

- Auburn Final Grind
- No Hands Bridge Push
- Diablo Heat Lab
- River Crossing Reset
- Crew Missed the Aid Station
- Saturday SUC Long Run

### Done When

- The first mission is stable.
- Shared mission config exists.
- Adding a mission does not require rewriting the game.

---

## Milestone Targets

### Milestone A — “It Moves”

A playable runner moves down a retro trail.

### Milestone B — “It Cooks You”

Heat and hydration can end the run.

### Milestone C — “Crew Saves You”

Crew decisions affect survival.

### Milestone D — “It Feels Like SUC”

The visuals, copy, and report feel specific.

### Milestone E — “Foresthill Is Replayable”

The mission has enough balance to replay multiple times.

## The Actual North Star

The first great moment should be:

> You are overheating, hydration is low, the screen is flashing, crew is 0.2 miles away, and you have to decide whether to push or back off.

If the game creates that moment, the concept works.
