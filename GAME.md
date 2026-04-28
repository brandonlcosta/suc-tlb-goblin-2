# SUC: The Long Burn

## One-line Pitch

A retro, pixelated third-person ultra-running survival game where you run brutal SUC-inspired trail missions while managing heat, hydration, ice, pacing, fatigue, and crew support.

## Core Fantasy

The player should feel like they are deep in a hot ultra, trying to survive one more section without falling apart.

This is not a normal running game about pure speed.

This is about:
- staying cool
- timing ice
- managing hydration
- trusting crew
- not bombing the descent too early
- staying mentally sharp when cooked
- getting to the next checkpoint alive

The fantasy is:

> You are on a legendary trail section. It is hot. You are moving well. But the canyon is taking pieces from you every minute.

## Player Role

The player is a SUC runner attempting to complete dangerous trail segments inspired by Western States, Auburn, Foresthill, Diablo, and local Sacramento ultra culture.

The player is not a superhero.

The player is a stubborn, prepared, slightly reckless endurance athlete using crew, ice, tactics, and grit to survive.

## Setting

The game takes place in fictionalized SUC trail mythology.

The first mission is:

# Foresthill Heat Drop

A Western States-inspired descent from a Foresthill-like town into exposed canyon terrain.

The setting should feel like:
- hot pavement-to-trail transition
- dusty singletrack
- canyon heat
- oak shade pockets
- orange trail markings
- old aid station energy
- SUC crew chaos
- retro game intensity

The game should not use exact real-world course data in V1.

It should be inspired, not dependent.

## Format

Mission-based.

Not open-world.

Each mission is a contained trail corridor with:
- start zone
- route intel
- trail section
- crew or aid point
- finish
- run report

## Core Loop

1. Choose a mission.
2. Read route intel.
3. Start running in third-person view.
4. Manage pace, hydration, heat, and fuel while moving down the trail.
5. Use ice/cooling before the heat gets out of control.
6. Hit the crew zone and make fast support choices.
7. Survive the final exposed push.
8. Finish or collapse.
9. Read the run report.
10. Decide what to improve next run.

## Main Mechanics

### Movement

The runner moves forward along a trail corridor.

The player controls:
- left/right line choice
- pace mode
- cooling use
- crew stop choices

Movement should feel simple, not simulation-heavy.

### Camera

The game should feel third-person.

For a lightweight prototype, this can be:
- behind-the-runner pseudo-3D
- 2.5D trail corridor
- pixelated chase camera
- scaled sprites
- parallax trail elements

Do not require complex 3D for V1.

The feel matters more than technical purity.

### Pace

Pace modes:

- **Easy**: slower, safer, lower heat gain
- **Steady**: default race pace
- **Push**: faster, higher heat/fatigue cost
- **Send**: risky surge, major heat/fatigue cost

Pace should be one of the main decisions.

### Heat

Heat is the main boss.

Heat rises from:
- exposure
- high pace
- climbing
- low hydration
- bad crew execution
- missing cooling windows

Heat drops from:
- ice
- water dumps
- shade
- slowing down
- crew support

When heat gets high:
- HUD flashes
- screen shimmers
- control gets slightly less stable
- warnings appear
- collapse risk increases

### Hydration

Hydration drains over time.

Low hydration causes:
- faster heat gain
- slower recovery
- higher fatigue
- worse late-section performance

### Ice / Cooling

Cooling is the signature mechanic.

Initial cooling options:
- ice bandana
- water dump
- ice sleeves, later
- shade recovery, later

In V1, this can be a single **Ice Active** meter.

When ice is active:
- heat gain slows
- heat may gradually drop
- the player has a temporary survival window

### Crew

Crew is a short tactical moment, not a full management sim.

At crew zones, the player chooses limited actions.

Example:
- refill bottles
- ice bandana
- water dump
- grab gels
- calm down
- leave fast

Each action costs seconds but gives survival benefits.

The crew should feel like SUC:
- direct
- chaotic
- funny
- supportive
- no corporate wellness energy

### Fatigue

Fatigue rises over time.

Fatigue rises faster when:
- heat is high
- hydration is low
- pace is too aggressive
- the player hits hazards
- crew choices are poor

Fatigue can reduce top speed or control sharpness.

Keep fatigue simple early.

### Trail Zones

Trail sections can have different conditions:

- shade
- exposed
- descent
- climb
- aid/crew zone
- technical rocks
- heat shimmer zone

Each zone modifies resource drain.

## Progression

Progression should start within the mission.

As the player gets deeper into Foresthill Heat Drop:
- heat pressure increases
- shade becomes less frequent
- hydration pressure rises
- the final push gets meaner
- bad pacing early makes the ending harder

Future progression can include:
- new missions
- harder weather variants
- better crew efficiency
- route intel unlocks
- challenge modes

Avoid long-term RPG systems early.

## Failure / Success

### Success

The player succeeds by reaching the finish line before collapse.

A good finish is not just fastest time.

The report should judge:
- finish time
- heat control
- hydration management
- crew efficiency
- pacing discipline
- final condition

### Failure

The player fails if:
- heat maxes out
- hydration collapses
- fatigue maxes out
- optional later: morale breaks

Failure should be part of the game.

It should produce a useful/funny run report.

Example verdicts:
- “Finished cooked.”
- “Canyon tax collected.”
- “You bombed the descent and paid for it.”
- “Crew saved your race.”
- “Hydration plan: criminal.”
- “SUC would roast you in the group chat.”
- “Bad idea. Good data.”

## Tone

Retro, gritty, local, weird, funny, intense.

The game should feel like:
- pixelated ultra chaos
- canyon heat
- old-school arcade survival
- SUC route intel
- crew yelling from a folding table
- handwritten signs
- blacktop shimmering
- dusty trail mythology

Avoid:
- polished corporate fitness vibes
- generic wellness tone
- fantasy RPG bloat
- fake inspirational fluff

## Visual Style

Retro pixelated.

The first visual target:
- low-resolution canvas look
- chunky pixel runner
- pseudo-3D trail corridor
- limited color palette
- dusty browns, black, bone, orange, neon green, hot red
- simple animated runner
- tactical HUD inspired by SUC/Topodex
- heat shimmer effects as simple screen distortion or overlay
- crew zone as a folding-table checkpoint

No expensive assets.

Use shapes, pixel sprites, and simple effects first.

## Audio Style

Optional early.

Future simple audio:
- footstep loop
- heat warning beep
- bottle pickup sound
- ice crunch
- crew shout blip
- finish sting
- collapse sting

No complex music system required.

## Controls

Keyboard first.

Recommended:

- `A` / `D` or left/right arrows: move left/right on trail
- `1`: easy pace
- `2`: steady pace
- `3`: push pace
- `4`: send pace
- `Space`: use cooling item
- `E`: interact at crew zone
- `P`: pause
- `R`: restart

Mobile controls are later.

## First Playable Version

The smallest playable version must include:

- browser app starts
- retro canvas renders
- third-person-style trail corridor exists
- runner moves forward automatically
- player can steer left/right
- heat meter rises
- hydration meter drains
- pace mode changes speed/resource drain
- ice/cooling pickup or button exists
- one crew zone exists
- finish line exists
- game-over exists
- run report exists
- restart works

That is enough.

## V1 Feature List

V1 should include:

### Screens
- title screen
- route intel screen
- gameplay screen
- run report screen

### Gameplay
- one mission: Foresthill Heat Drop
- third-person trail corridor
- player steering
- pace modes
- heat meter
- hydration meter
- fatigue meter
- ice/cooling system
- crew zone triage
- finish line
- failure conditions
- run report

### Style
- retro pixelated look
- SUC-inspired HUD
- route intel card
- heat warnings
- crew flavor text

## Later Ideas

Do not build yet:

- exact Western States map
- real GPX import
- real route elevation data
- Strava integration
- online leaderboards
- multiplayer crews
- accounts
- custom character creator
- big campaign
- full coaching sim
- open-world Auburn
- procedural trail network
- complex inventory
- sponsorship systems
- Topodex live integration
- mobile app wrapper

## Hard Constraints

- No multiplayer.
- No accounts.
- No online services.
- No external APIs.
- No real map dependency.
- No real GPX dependency.
- No huge open world.
- No giant procedural terrain.
- No complex crafting.
- No giant RPG system.
- No broad refactors without explicit approval.
- No dependency sprawl.
- No auto-push.
- No auto-merge.
- No auto-deploy.
- No feature that does not improve the core loop.

Every feature must improve one of these:
- running feel
- heat pressure
- hydration/cooling strategy
- crew decision-making
- mission clarity
- replayability
- SUC identity

## Definition of Done

A feature is only done if:

- the game still starts
- the core loop still works
- controls are not broken
- validation/build passes
- no obvious console errors appear
- the feature is visible or testable in-game
- the change stays inside the approved scope
- a run report is written in `reports/runs/`
- known issues are documented honestly

## AI Development Rules

- Implement one small feature per run.
- Read `GAME.md` before every change.
- Read the active prompt before every change.
- Use a fresh branch or worktree.
- Do not consume multiple prompts in one run.
- Do not add systems that conflict with this bible.
- Do not refactor broadly without explicit prompt approval.
- Prefer playable improvements over architecture.
- Write a report after every run.
- Never push automatically.
- Never merge automatically.
- Never deploy automatically.
- Never edit BC-OS from the game automation.

Brandon remains the final reviewer.
