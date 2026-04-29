# SUC: The Long Burn — PS1 Cal Street Roadmap

## Roadmap Philosophy

This is now a serious portrait-mode mobile, touchscreen-first low-poly 3D downhill ultra survival game.

Do not build a huge race simulator.

Do not build all of Western States.

Build one section that feels dangerous:

# Cal Street Heat Drop

The first mission should make the player think:

> I can fly downhill right now, but if I do, I may not survive the last third.

That is the heart of the game.

## Phase 0 — Direction Lock

### Goal

Lock the revised identity.

### Deliverables

- `GAME.md`
- `ROADMAP.md`
- `docs/CAL_STREET_HEAT_DROP.md`
- `docs/MECHANICS_SPEC.md`
- `docs/PS1_3D_STYLE_GUIDE.md`
- `docs/LEVEL_DESIGN_GUIDE.md`
- AI rules
- BC-OS integration plan
- prompt queue

### Done When

- Everyone understands this is PS1-style 3D.
- Everyone understands portrait mobile and touch are primary.
- The first mission is Cal Street / Foresthill-inspired.
- The core loop is downhill survival, not loop arcade.
- Scope boundaries are clear.

---

## Phase 1 — Minimal PS1 3D Shell

### Goal

Make the game exist as a 3D scene.

### Player Experience

The player opens the game on a phone held vertically and sees a low-poly runner on a simple downhill trail.

### Features

- browser app
- lightweight 3D renderer
- low-poly scene
- third-person camera
- runner placeholder
- simple downhill plane/trail
- basic HUD
- portrait mobile layout
- basic touch input surface
- restart

### Not Included

- no full heat model
- no crew system
- no real assets
- no complex animation
- no big terrain

### Done When

- 3D scene loads.
- Runner is visible.
- Camera follows.
- Build passes.

---

## Phase 2 — Downhill Trail Feel

### Goal

Make it feel like descending a serious trail section.

### Features

- trail corridor
- downhill slope
- simple turns
- limited draw distance / fog
- line boundaries
- touch left/right steering
- touch braking/control
- speed changes by slope/pace
- rocks or simple obstacles

### Done When

- The player can steer.
- Downhill speed feels tempting.
- Braking/control matters.
- Touch controls are readable and do not hide the trail.
- The section feels like a descent.

---

## Phase 3 — Heat, Hydration, Quad Damage

### Goal

Add the survival layer.

### Features

- heat meter
- hydration meter
- quad damage meter
- heat failure
- hydration pressure
- quad damage penalty
- basic warning states

### Done When

- Sending downhill has consequences.
- Poor hydration makes heat worse.
- Quad damage creates late-section cost.

---

## Phase 4 — Pace and Braking Strategy

### Goal

Make descent management tactical.

### Features

- Control / Steady / Push / Send pace modes
- braking input
- heat gain by pace
- hydration drain by pace
- quad damage by pace and speed
- improved HUD feedback
- portrait-safe pace controls

### Done When

- “Send” is fun but dangerous.
- “Control” is slower but smart.
- The game rewards patience.

---

## Phase 5 — Ice and Cooling

### Goal

Add the signature SUC heat-management mechanic.

### Features

- cooling charge
- ice active meter
- tap-to-use cooling
- heat reduction / heat gain reduction
- visual feedback
- heat shimmer reduction when cooling works

### Done When

- Cooling feels like a tactical survival tool.
- Bad cooling timing can ruin a run.

---

## Phase 6 — Foresthill Crew Start

### Goal

Make crew part of the mission identity.

### Features

- start/crew zone
- quick touch crew action menu
- limited support choices
- hydration refill
- ice bandana
- water dump
- gels/fuel optional
- crew efficiency stat
- SUC crew text

### Done When

- The run feels shaped by crew choices.
- Starting underprepared has consequences.

---

## Phase 7 — Finish and Run Report

### Goal

Make the mission complete.

### Features

- finish line
- success state
- failure state
- elapsed time
- max heat
- lowest hydration
- quad damage
- crew choices
- verdict
- restart
- portrait run report layout

### Done When

- The player can finish or fail.
- The report makes the run feel meaningful.
- Replay is immediate.

---

## Phase 8 — PS1 Atmosphere Pass

### Goal

Make the game visually and emotionally distinct.

### Features

- low-res render mode if practical
- pixelated textures
- fog / limited draw distance
- angular props
- canyon color palette
- harsh sun
- retro HUD
- mobile portrait HUD
- serious warning text
- subtle screen effects

### Done When

- A screenshot says “lost PS1 ultra-running game.”
- It feels SUC-coded without needing explanation.

---

## Phase 9 — Balance and Playtest

### Goal

Make Cal Street Heat Drop replayable.

### Features

- tuning constants
- 3–7 minute mission target
- multiple play styles viable
- reckless play punishable
- smart crew/cooling rewarded
- portrait touch playability checks
- manual playtest reports

### Done When

- Cautious play can finish.
- Reckless play can fail.
- Skilled play can finish faster without total collapse.
- It is worth showing someone.

---

## Phase 10 — Second Mission Only After First Works

Candidate second missions:

- Auburn Final Grind
- No Hands Bridge Push
- Diablo Heat Lab
- River Crossing Reset
- Crew Missed the Aid Station
- Saturday SUC Long Run

Do not start these until Cal Street Heat Drop is fun.

## Milestones

### Milestone A — “It Exists in 3D”

Runner, camera, trail, build pass.

### Milestone B — “It Descends”

Downhill movement, steering, braking, trail corridor.

### Milestone C — “It Punishes Greed”

Heat, hydration, and quad damage make bad pacing hurt.

### Milestone D — “Crew Matters”

Start support choices affect the run.

### Milestone E — “It Feels Like a Lost PS1 Ultra Game”

Low-poly, serious, hot, weird, SUC.

### Milestone F — “Cal Street Is Replayable”

The mission has enough feel, risk, and feedback to replay.

## North Star Moment

The player is halfway down the descent.

Heat is climbing.  
Quads are damaged.  
Hydration is low.  
The trail opens into an exposed section.  
The finish is still far enough away to scare them.

They can send it.

They should not.

That decision is the game.
