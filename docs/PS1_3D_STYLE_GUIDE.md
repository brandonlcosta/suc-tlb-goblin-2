# PS1 3D Style Guide

## Visual Target

The game should look like a lost PlayStation-era trail ultra game.

Not modern realistic.

Not pixel-art 2D.

Not cartoony.

The target is:

> Low-poly 3D canyon heat with a tactical SUC HUD in a portrait mobile frame.

Cleaner readability is welcome. Modern realism is not.

## Keywords

- PS1
- low-poly
- dusty
- foggy
- hot
- serious
- angular
- readable silhouette
- harsh sun
- limited draw distance
- flags and ribbon
- marked trail race
- simple race actors
- retro trail survival
- early 3D weirdness

## Camera

Third-person chase camera.

Recommended V1:
- camera behind and slightly above runner
- runner visible
- trail ahead visible
- mild camera follow smoothing
- limited draw distance with fog
- avoid complex cinematic camera work

The camera must make downhill motion readable.

Portrait mobile is the default composition. The runner can sit lower in the frame than on desktop so the player has enough vertical trail preview while touch controls occupy the bottom edge.

## Geometry

Use simple low-poly geometry:
- trail mesh or segmented path
- curved trail sections
- switchback turns
- steeper downhill planes
- one short uphill segment
- angular canyon walls
- river crossing cut through the trail
- simple log mesh across water
- blocky rocks
- low-poly trees
- flags, ribbon, stakes, signs, cones, and marker boards
- flat-shaded terrain
- low-poly crew/aid tables
- simple spectator, volunteer, and other-runner silhouettes

Avoid high-detail assets.

## Texture Style

Textures should feel low-res.

Approaches:
- nearest-neighbor texture sampling
- small repeating dirt texture
- simple color blocks
- fake pixelated surface details
- low-res UI overlays

Do not chase photorealism.

## Color Palette

### Environment

- dusty tan
- burnt brown
- dry grass yellow
- dark oak green
- asphalt gray
- canyon orange
- washed-out sky blue
- muted river blue/green
- dark wet-rock gray

### Danger

- hot red
- warning orange
- harsh yellow

### SUC / HUD

- black
- off-white
- neon green
- stencil white
- signal red

## Lighting

Keep it simple.

Target:
- harsh sun
- flat-ish lighting
- simple shadows if easy
- fog for distance
- orange heat tint in exposed zones
- cooler tint near water only if readable

Do not build a complex lighting system early.

## Fog / Draw Distance

Fog is good.

It helps:
- PS1 vibe
- performance
- atmosphere
- scope control

Use fog to hide world limits.

## Runner Model

The runner should become cleaner and more readable while staying low-poly.

Target:
- simple but cleaner low-poly humanoid
- clear head/torso/arm/leg shapes
- strong silhouette in portrait
- obvious forward direction
- readable posture
- black kit with a bright accent if useful
- simple fake shadow
- enough limb separation to make the stride readable
- stronger downhill and braking poses than the placeholder

This is better readability and movement feel inside the PS1 style, not a move away from PS1 style.

Avoid:
- high-poly model requirements
- character creator scope
- realistic anatomy chase
- asset bloat

## Animation

Early animation should be simple and readable:
- basic run cycle
- speed-based stride intensity
- arm swing and leg cycle that read at portrait scale
- downhill lean
- braking / controlled descent posture
- slight wobble under high quad damage
- optional stumble on failed log or rough impact
- optional water-splash step animation later

Avoid complex animation trees.

The player should understand speed, control, and damage state at a glance.

## River Water

Water should be readable in PS1 terms:
- flat or gently animated low-poly surface
- simple blue/green/dark tint
- hard-edged shoreline
- low-res ripple texture if available
- splash feedback later

The water should look like canyon terrain, not a shiny modern simulation.

## Logs

Logs should be:
- thick enough to read on a phone
- visibly faster than the water route
- narrow enough to require control
- low-poly and slightly irregular
- placed with a fair approach angle

Avoid tiny precision beams and platformer spam.

## Course Markers

The visual language should be trail-race marking, not arcade checkpoints.

Use:
- vertical flags
- small feather flags
- ribbon or tape between stakes
- wooden stakes with course arrows
- caution boards before steeps, switchbacks, water, or logs
- cones and aid marker boards
- finish chute flags and tape

Avoid visible checkpoint arches as the main course marker. A finish can feel official through a marked chute, sign, flags, timing mat shape, or aid-area prop language without becoming an arcade gate.

Markers should be chunky, high contrast, and readable through fog and heat effects.

## Other Runners

Other runners should be sparse, low-poly race actors.

Target:
- a few silhouettes on course, near aid, or in the distance
- simple kit color variations
- low-detail versions of the player runner language
- simple stride or bob if lightweight
- no facial detail requirement

They should help the world feel like an ultra, but they must not hide the trail, confuse line choice, or require full racing AI.

## Spectators and Volunteers

Spectators and volunteers should appear where the route naturally has life:
- Foresthill crew start
- second aid station
- river crossing
- switchback overlook
- finish chute

Target:
- static or lightly animated low-poly figures
- simple clapping, waving, or leaning poses if cheap
- small clusters, not crowds
- clear separation from playable lane markers

Avoid crowd simulation, pathfinding, dense human walls, or modern character-detail scope.

## Switchbacks, Steeps, and Uphill

Visual cues:
- switchbacks: visible turn markers, trail edge contrast, camera preview
- steep downhill: stronger slope angle, downhill warning marker, faster foreground motion
- uphill: visible grade change, slower runner posture, hotter exposed color

The player should read these before committing.

## Aid Station Visuals

Foresthill crew start and the second aid station should feel human and grounded.

Useful props:
- folding table
- coolers
- water jugs
- orange cones
- SUC sign
- simple crew silhouettes
- volunteer and spectator silhouettes
- flags, tape, stakes, and marker boards
- shade tent if easy
- second aid marker / banner

Keep props simple and reusable.

## Advanced Retro Polish

Advanced polish means lightweight retro treatment, not modern rendering ambition.

Good candidates:
- tuned fog and draw distance
- low-res surface textures
- subtle water shimmer or scrolling color bands
- simple splash sprites or particles
- dust puffs behind feet
- heat shimmer overlay if cheap
- stronger trail/edge contrast
- simple fake shadows
- distant canyon silhouettes

Avoid:
- heavy post-processing stacks
- ray tracing or realistic shaders
- high-resolution asset packs
- effects that reduce route readability
- anything that hides the runner under the HUD or touch controls

## HUD

HUD should feel tactical and serious.

Elements:
- mission name
- progress
- pace
- heat
- hydration
- quad damage
- ice active
- crew/aid/final distance
- water/log crossing warning if implemented
- warning text

Use:
- sharp boxes
- monospace/pixel font
- uppercase labels
- high contrast
- black transparent panels
- neon/signal accents

## Portrait Mobile UI

The primary layout is a narrow 9:16 phone viewport.

Priorities:
- trail readability before decoration
- runner visible above bottom touch controls
- resource meters readable at a glance
- upcoming curves/crossings visible early enough
- warning states visible without covering steering/brake zones
- large tap targets for pace, cooling, crew, aid, pause, and restart
- safe spacing around phone browser edges and notches

Avoid:
- landscape-only HUD placement
- tiny text that only works on desktop
- controls that hide hazards or the runner
- mouse-hover-only interactions

## Warning Effects

At high heat:
- red/orange HUD pulse
- screen edge heat tint
- shimmer overlay if simple
- warning text
- slight camera instability

At high quad damage:
- runner wobble
- heavier camera bob
- warning text

At low hydration:
- desaturated tint
- warning beep later

At water/log crossing:
- route warning marker
- safe/fast line hint
- splash or stumble feedback later

## Anti-Goals

Do not build:
- realistic AAA terrain
- detailed character creator
- motion-captured animation
- high-poly runner requirement
- huge asset packs
- real-world map rendering
- complex foliage
- cinematic cutscenes
- advanced water simulation
- precision platformer log sections
- giant open environment
- checkpoint-arch visual language as the default course identity
- full race AI or crowd simulation

Rough, readable, hot, and tense wins.
