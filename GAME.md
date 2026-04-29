# SUC: The Long Burn

## One-line Pitch

A portrait-mode mobile, touchscreen-first PS1-style low-poly 3D ultra-running survival game where you descend a brutal Cal Street / Foresthill-inspired canyon section while managing heat, hydration, ice, quad damage, pace, braking, crew support, river/log crossing choices, and survival momentum.

## Core Fantasy

The player should feel like they just left Foresthill and are dropping into a dangerous section where everything can go wrong if they get greedy.

This is not a standard running game about being fast.

This is about:
- controlling downhill speed
- not trashing your quads
- reading curves and switchbacks before they bite
- choosing safe or fast lines through canyon terrain
- crossing water without losing the race rhythm
- deciding whether a log crossing is worth the risk
- managing heat before it spikes
- staying hydrated
- using ice and water at the right time
- making quick aid-station decisions
- getting through the section without detonating

The fantasy is:

> You are moving fast downhill, the canyon is hot, the trail is bending away under your feet, water is coming up, your crew did what they could, and now you have to execute.

## Player Role

The player is a SUC runner in a fictional ultra.

They are not a superhero.

They are an endurance athlete trying to survive a legendary downhill section with tactics, discipline, cooling, line choice, crew support, and stubbornness.

The player must balance:
- speed
- braking
- line choice
- heat
- hydration
- quad damage
- water crossing choices
- crew support
- finishing condition

The primary play context is a phone held vertically. The game should be readable, controllable, and tense in portrait mode without requiring a keyboard, mouse, controller, or landscape rotation.

## Setting

The first mission is:

# Cal Street Heat Drop

A fictionalized mission inspired by the Cal Street / Foresthill section of Western States.

It is not a GPS-accurate recreation.

It should feel like:
- leaving a Foresthill-style crew zone
- dropping into canyon heat
- dusty trail and old roads
- exposed turns
- curved downhill geometry
- switchbacks
- one short uphill interruption
- steeper downhill pitches
- river crossings
- one memorable log crossing option
- water slowing the runner while possibly cooling them slightly
- a second aid station / support point before the final push
- oak shade pockets
- harsh downhill rhythm
- late-day ultra pressure

The world should be stylized and low-poly, like a lost PS1 endurance game.

## Format

Mission-based.

Not open-world.

Each mission is a contained trail corridor with:
- route intel
- start/crew zone
- serious downhill section
- terrain variation
- heat and hydration pressure
- technical line choices
- aid/support points
- finish point
- run report

## Core Loop

1. Read route intel.
2. Start at a Foresthill-style crew/aid zone.
3. Choose initial support: hydration, ice, fuel, calm-down, water dump, or fast exit.
4. Descend the trail in third-person view.
5. Manage pace, braking, line choice, heat, hydration, and quad damage.
6. Read curves, switchbacks, steep drops, and the short uphill before committing.
7. Choose crossing lines through river terrain: slower safer water or faster riskier log.
8. Use cooling before heat debt gets out of control.
9. Make a quick second aid-station decision before the final push.
10. Reach the finish or collapse.
11. Read the run report.
12. Replay to improve execution.

## Main Mechanics

### Third-Person Downhill Movement

The player runs along a 3D trail corridor.

The game should feel third-person:
- camera behind the runner
- runner visible on screen
- trail moving downhill ahead
- terrain slopes and turns
- simple low-poly environment
- curved trail sections readable in portrait

The player controls:
- left/right line choice
- pace mode
- braking or restraint
- cooling use
- crew and aid-station decisions

The runner can auto-forward, but the player must manage speed and control.

Primary interaction is touchscreen input on a portrait phone. Keyboard controls may exist as a desktop/debug fallback, but the game should not be designed around them.

### Downhill Momentum

Downhill speed is tempting but dangerous.

If the player descends too aggressively:
- speed increases
- heat rises faster
- hydration drains faster
- quad damage rises
- corner control becomes harder
- steep sections become costly
- late-section fatigue gets worse

The downhill should feel like a tactical trap.

### Terrain Variation

The first mission should include more than a straight corridor.

Terrain variation includes:
- fast downhill rollout
- steeper Cal Street-style drops
- curves
- switchbacks
- one short uphill heat check
- river crossing terrain
- final downhill survival push

Terrain should stay readable and fair. It should increase control pressure without becoming a maze, platformer, or open-world route.

### Pace / Effort

Pace modes:

- **Control**: slower, safer, lower damage
- **Steady**: default race rhythm
- **Push**: faster, higher heat/damage
- **Send**: fast and dangerous

This is not just speed selection.

It is risk selection.

### Braking / Restraint

The player needs a way to manage downhill aggression.

Possible V1 control:
- hold a thumb control button or press-and-hold the lower screen to brake/control descent

Braking:
- lowers speed
- lowers quad damage risk
- may cost time
- may help technical turns, switchbacks, and logs
- may reduce heat slightly if effort drops

The game should reward restraint.

### Heat

Heat is one of the main threats.

Heat rises from:
- exposure
- high pace
- low hydration
- technical stress
- uphill effort
- prolonged downhill sending

Heat drops from:
- ice
- water dump
- shade
- slowing down
- good crew execution
- possible small cooling benefit from water crossings

At high heat:
- HUD flashes
- screen warps/shimmers
- control gets slightly less stable
- breathing/audio pressure increases
- collapse risk rises

### Hydration

Hydration drains over time.

Low hydration:
- makes heat rise faster
- makes recovery weaker
- increases fatigue
- makes uphill interruptions harsher
- makes late-section control worse

### Quad Damage

Quad damage is the downhill-specific mechanic.

It rises from:
- aggressive downhill speed
- high pace on descents
- steep downhill sections
- hard braking too late
- technical impacts
- bad line choice
- missing/falling off a log crossing

High quad damage:
- lowers top speed
- increases fatigue
- makes the final section harder
- worsens run report grade

This mechanic makes the downhill serious.

### Water / River Crossings

River crossings are part of the first mission identity, not random obstacle-course clutter.

Water rules:
- entering water slows the runner
- deeper water slows more
- water may reduce heat slightly
- water can interrupt pace rhythm
- splashing through water is slower but safer
- crossings should feel like canyon terrain

The crossing choice should matter: safe/slow water versus fast/risky log.

### Log Crossings

Logs across water are a terrain and line-choice mechanic.

Design rules:
- logs provide a faster crossing route
- logs require better steering and control
- falling or missing the log slows the player
- a bad log attempt may add fatigue or quad damage
- logs must be readable and fair
- one memorable log crossing is better than many cheap ones

Logs are not platformer spam.

### Ice / Cooling

Cooling is signature SUC strategy.

V1 can use one **Ice Active** meter.

Cooling effects:
- slows heat gain
- may drop heat
- buys time through exposed sections
- can pair with aid-station decisions

Water crossings may provide a smaller, terrain-driven cooling effect, but they should not replace ice or crew support.

Later cooling types:
- ice bandana
- ice sleeves
- water dump
- hat ice
- creek dunk

### Crew and Aid Stations

Crew is a short tactical moment.

The first mission starts with a crew/aid zone and later includes a second aid station / support point before the final survival push.

Example start choices:
- refill bottles
- ice bandana
- water dump
- grab gels
- calm down
- leave fast

Example second aid station choices:
- top off hydration
- quick ice/cooling reset
- water dump
- grab fuel
- skip to save time

Aid-station choices affect hydration, cooling, fuel, time, and final survival.

Crew and aid are not a separate management sim. They are quick choices under pressure.

### Trail Line Choice

The player should care about where they run.

Possible line types:
- smooth line
- rocky line
- shade line
- exposed line
- fast outside turn
- safer inside line
- safe water route
- faster log route

Line choice can affect:
- speed
- heat
- hydration
- quad damage
- collision risk
- control pressure

Keep this simple early.

### Runner Model and Animation

The runner should become cleaner and more readable inside the PS1 style.

Target:
- cleaner low-poly runner model
- better silhouette
- readable posture
- obvious running direction
- basic but cleaner run animation
- downhill lean
- braking / controlled descent posture
- optional stumble or wobble under high quad damage
- optional water-splash step animation later

This is better readability and movement feel inside the PS1 style, not a move away from PS1 style.

Do not chase modern realism.

Do not add high-poly asset requirements.

Do not create animation-system bloat.

## Progression

Progression starts inside one mission.

As the player descends:
- terrain gets faster
- grades become steeper
- curves and switchbacks demand braking
- river/log choices interrupt rhythm
- heat pressure increases
- shade becomes less reliable
- hydration becomes more important
- quad damage starts to matter
- the second aid station creates a tactical reset
- the finish becomes a survival test

Later progression can include:
- new missions
- harder heat variants
- better crew systems
- route intel cards
- challenge modes

Avoid RPG sprawl early.

## Failure / Success

### Success

The player succeeds by reaching the finish.

A strong finish means:
- good time
- controlled heat
- hydration not destroyed
- quads not blown up
- crew and second-aid choices made sense
- river/log decisions were disciplined
- final condition still runnable

### Failure

The player can fail by:
- overheating
- dehydration collapse
- quad damage/fatigue collapse
- leaving crew underprepared and detonating later
- sending steep downhill too hard
- mismanaging water/log crossing risk

Failure should produce a serious but SUC-flavored run report.

Example verdicts:
- "Finished cooked."
- "You survived, but the descent took payment."
- "You bombed Cal Street like a rookie."
- "Crew saved your race."
- "Fast early. Expensive late."
- "Canyon tax collected."
- "Good data. Bad execution."

## Tone

Serious, gritty, tense, SUC-coded.

Less meme. More pressure.

The humor should be dry and harsh, not goofy.

The vibe:
- hot canyon
- old-school 3D
- low-poly trail
- early PlayStation fog
- black kit
- sharp HUD
- crew yelling from a folding table
- water cutting the rhythm
- a log that looks faster than it feels safe
- "this section can ruin your race"

Avoid:
- polished corporate fitness tone
- cartoony wellness
- generic fantasy
- goofy obstacle-course energy

## Visual Style

PS1-style low-poly 3D.

The game should look like a lost PlayStation-era trail ultra game.

Visual traits:
- low-poly terrain
- low-res textures
- cleaner low-poly runner silhouette
- simple readable animation
- affine/warped texture feel if possible
- visible fog
- limited draw distance
- harsh sun color
- dithered shadows or simple fake shadows
- angular rocks and trees
- simple canyon geometry
- readable river water and logs
- retro HUD overlays

Do not chase modern realism.

The roughness is part of the identity. Cleaner readability is the goal, not higher fidelity.

## Audio Style

Optional for early builds.

Future audio:
- footstep loop
- breathing pressure
- heat warning tone
- ice/water sound
- river splash
- log footstep creak
- crew/aid shout blips
- wind and canyon ambience
- low drone during critical heat

No licensed music.

## Platform / Orientation

Portrait mobile is the primary target.

The game should assume:
- a phone held vertically
- touchscreen interaction
- thumb-reachable controls
- HUD readable on a narrow 9:16 viewport
- runner and trail visible despite on-screen controls
- no required keyboard, mouse, controller, or landscape rotation

Desktop play is allowed as a fallback, but it must not drive layout, input design, or feature priorities.

## Controls

Touchscreen first.

Recommended portrait touch layout:

- lower-left steering zone: drag or hold left/right to choose line
- lower-right control button: hold to brake/control descent
- pace selector: thumbable Control / Steady / Push / Send control
- cooling button: tap to use ice/cooling when available
- crew and aid actions: tap large quick-choice buttons
- pause/restart: small top-corner controls with restart confirmation

Controls should be playable with one or two thumbs while keeping the trail readable.

Keyboard fallback for desktop/debug:

- `A` / `D` or left/right arrows: steer / choose line
- `W` or up arrow: lean into pace / push if needed
- `S` or down arrow: brake / control descent
- `1`: Control pace
- `2`: Steady pace
- `3`: Push pace
- `4`: Send pace
- `Space`: use cooling
- `E`: interact with crew or aid
- `P`: pause
- `R`: restart

## First Playable Version

The smallest playable version must include:

- browser app starts in a portrait mobile layout
- simple PS1-style 3D scene renders
- third-person camera follows runner
- downhill trail corridor exists
- runner moves downhill/forward
- player can steer left/right with touch
- player can slow/control descent with touch
- heat meter rises
- hydration meter drains
- quad damage exists
- pace modes affect speed and resource pressure
- cooling is usable with touch
- one crew/start zone exists
- crew choices are usable with touch
- finish line exists
- game-over exists
- run report exists
- restart works

The first playable may use placeholders for river/log, second aid, cleaner animation, and expanded terrain if those are staged into later prompts.

## V1 Feature List

### Screens

- title screen
- route intel screen
- gameplay screen
- run report screen

All V1 screens should be designed for portrait mobile first.

### Mission

- one mission: Cal Street Heat Drop
- Foresthill-style start / crew zone
- downhill trail corridor
- curved/switchback trail sections
- steeper downhill sections
- one short uphill heat check
- river crossing with safe water and faster/riskier log choice
- exposed heat section
- second aid station / support point
- final survival push
- finish line

### Systems

- third-person movement
- downhill momentum
- braking/control
- pace modes
- heat
- hydration
- quad damage
- water slowdown with possible small cooling effect
- log crossing risk/reward
- ice/cooling
- crew support
- second aid support
- simple run report

### Style

- PS1 low-poly 3D
- cleaner readable low-poly runner
- simple readable run/brake/downhill animations
- SUC tactical HUD
- serious route intel
- heat warning effects
- canyon fog / limited draw distance
- gritty crew text

## Later Ideas

Do not build yet:

- exact Western States map
- real Cal Street GPS
- full Western States course
- real GPX import
- Strava integration
- online leaderboards
- multiplayer crews
- accounts
- open-world Auburn
- custom route editor
- full career mode
- complex biomechanics
- advanced balance physics on logs
- full swimming
- complex water physics
- many aid stations
- huge animation system or complex animation trees
- detailed nutrition inventory
- sponsor/brand systems
- landscape/desktop-focused mode
- keyboard-only desktop mode

## Hard Constraints

- No multiplayer.
- No accounts.
- No online services.
- No external APIs.
- No real map dependency.
- No real GPX dependency.
- No full Western States recreation.
- No huge open world.
- No giant procedural terrain.
- No complex RPG systems.
- No broad refactors without explicit approval.
- No dependency sprawl.
- No modern realistic asset chase.
- No high-poly character requirement.
- No animation-system bloat.
- No platformer-spam log crossings.
- No desktop-only controls.
- No keyboard-required core actions.
- No landscape-only screens.
- No auto-push.
- No auto-merge.
- No auto-deploy.
- No feature that does not improve the core downhill survival loop.

Every feature must improve one of these:
- third-person downhill feel
- heat pressure
- hydration pressure
- quad damage / restraint
- line choice
- river/log crossing decisions
- crew and aid decision-making
- PS1 atmosphere
- SUC identity
- replayability

## Definition of Done

A feature is only done if:

- the game still starts
- the mission still loads
- touch controls are not broken
- keyboard fallback is not broken if present
- validation/build passes
- no obvious console errors appear
- the feature is visible or testable in-game
- the change stays inside approved scope
- river/log/aid/terrain additions remain readable and fair if touched
- PS1 style remains the visual target if art/animation is touched
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
- Prefer playable downhill feel over architecture.
- Write a report after every run.
- Never push automatically.
- Never merge automatically.
- Never deploy automatically.
- Never edit BC-OS from the game automation.

Brandon remains the final reviewer.
