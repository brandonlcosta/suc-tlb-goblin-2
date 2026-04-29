# SUC: The Long Burn - PS1 Cal Street Roadmap

## Roadmap Philosophy

This is a serious portrait-mode mobile, touchscreen-first low-poly 3D downhill ultra survival game.

Do not build a huge race simulator.

Do not build all of Western States.

Build one section that feels dangerous:

# Cal Street Heat Drop

The first mission should make the player think:

> I can fly downhill right now, but if I do, I may not survive the last third.

That is the heart of the game.

The new direction adds canyon-terrain identity without broadening the game into an open world: curves, switchbacks, steeper downhill pitches, one short uphill, river/log crossing choices, a second aid station, and a cleaner readable PS1 runner.

## Phase 0 - Direction Lock

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
- The first mission is Cal Street / Foresthill-inspired, not GPS-accurate.
- The core loop is downhill survival, not loop arcade.
- River/log crossings and terrain variation are part of the first-mission direction.
- Scope boundaries are clear.

---

## Phase 1 - Minimal PS1 3D Shell

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

## Phase 2 - Downhill Trail Feel

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

## Phase 3 - Heat, Hydration, Quad Damage

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

## Phase 4 - Pace and Braking Strategy

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

- "Send" is fun but dangerous.
- "Control" is slower but smart.
- The game rewards patience.

---

## Phase 5 - Terrain Variation Pass

### Goal

Turn the corridor into a readable canyon descent instead of a straight lane.

### Features

- natural curves
- switchbacks where useful
- steeper downhill sections
- one short uphill heat check
- slope/section modifiers
- readable warning markers before steep or technical sections
- portrait-safe turn preview

### Done When

- Curves and switchbacks reward braking and line choice.
- Steeper downhill increases speed temptation and quad risk.
- The uphill is short, purposeful, and hotter.
- The route still reads as one corridor, not a maze.

---

## Phase 6 - River and Log Crossing Mechanics

### Goal

Make canyon water a tactical terrain decision.

### Features

- river crossing section
- water slowdown
- deeper water slows more if represented
- small optional cooling benefit from water
- faster log crossing route
- log route requires cleaner steering/control
- missed/fallen log attempt costs speed and may add fatigue/quad damage
- readable fair approach

### Done When

- Safe water is slower but reliable.
- Log crossing is faster but riskier.
- The crossing feels like canyon terrain, not arcade platform spam.
- One memorable crossing is better than many cheap ones.

---

## Phase 7 - Ice, Cooling, and Aid Support

### Goal

Tie cooling and support choices into the expanded mission shape.

### Features

- cooling charge
- ice active meter
- tap-to-use cooling
- heat reduction / heat gain reduction
- water-cooling tuning so crossings help slightly without replacing ice
- Foresthill crew start remains quick and tactical
- second aid station / support point before the final push
- second aid quick choices affect hydration, cooling, fuel, time, and final survival

### Done When

- Cooling feels like a tactical survival tool.
- Bad cooling timing can ruin a run.
- The second aid station creates a reset decision without becoming a management sim.

---

## Phase 8 - Finish and Run Report

### Goal

Make the expanded mission complete and legible after the run.

### Features

- finish line
- success state
- failure state
- elapsed time
- max heat
- lowest hydration
- quad damage
- crew and second-aid choices
- river/log crossing outcome
- steep/uphill/switchback consequences if tracked
- verdict
- restart
- portrait run report layout

### Done When

- The player can finish or fail.
- The report makes the run feel meaningful.
- Terrain and support decisions are visible in the recap where useful.
- Replay is immediate.

---

## Phase 9 - Cleaner Retro Runner and Animation Pass

### Goal

Improve readability and movement feel while staying PS1.

### Features

- cleaner low-poly runner model
- stronger silhouette
- obvious facing/running direction
- basic run cycle
- downhill lean
- braking / controlled descent posture
- optional stumble/wobble under high quad damage
- no high-poly asset requirement
- no complex animation tree

### Done When

- The runner reads better at portrait size.
- Speed/control state is easier to understand.
- The style still looks like a lost PS1 ultra game.

---

## Phase 10 - PS1 Atmosphere Pass

### Goal

Make the game visually and emotionally distinct.

### Features

- low-res render mode if practical
- pixelated textures
- fog / limited draw distance
- angular props
- canyon color palette
- harsh sun
- readable river water and logs
- second aid-station props
- steep/uphill visual cues
- retro HUD
- mobile portrait HUD
- serious warning text
- subtle screen effects

### Done When

- A screenshot says "lost PS1 ultra-running game."
- River/log/aid/terrain additions fit the same style.
- It feels SUC-coded without needing explanation.

---

## Phase 11 - Balance and Playtest

### Goal

Make Cal Street Heat Drop replayable.

### Features

- tuning constants
- 3-7 minute mission target
- multiple play styles viable
- reckless play punishable
- smart crew/cooling rewarded
- water/log choice tuned
- steep/downhill/uphill sections tuned
- second aid station tuned
- portrait touch playability checks
- manual playtest reports

### Done When

- Cautious play can finish.
- Reckless play can fail.
- Skilled play can finish faster without total collapse.
- The log is tempting but not mandatory.
- Water slowdown/cooling has meaning.
- It is worth showing someone.

---

## Phase 12 - Second Mission Only After First Works

Candidate second missions:

- Auburn Final Grind
- No Hands Bridge Push
- Diablo Heat Lab
- Crew Missed the Aid Station
- Saturday SUC Long Run

Do not start these until Cal Street Heat Drop is fun.

## Milestones

### Milestone A - "It Exists in 3D"

Runner, camera, trail, build pass.

### Milestone B - "It Descends"

Downhill movement, steering, braking, trail corridor.

### Milestone C - "It Punishes Greed"

Heat, hydration, and quad damage make bad pacing hurt.

### Milestone D - "The Trail Has Teeth"

Curves, switchbacks, steep downhill, uphill, and river/log choices pressure control.

### Milestone E - "Crew Matters Twice"

Start support and the second aid decision affect the run.

### Milestone F - "It Feels Like a Lost PS1 Ultra Game"

Low-poly, serious, hot, weird, readable, SUC.

### Milestone G - "Cal Street Is Replayable"

The mission has enough feel, risk, and feedback to replay.

## North Star Moment

The player is halfway down the descent.

Heat is climbing.
Quads are damaged.
Hydration is low.
The trail tips steeper, bends into switchbacks, and a river crossing is coming.
The log line looks fast.
The water line looks safer.
The second aid station is still ahead, but not close enough to save bad decisions.

They can send it.

They should not.

That decision is the game.
