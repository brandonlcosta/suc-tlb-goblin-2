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
- simple fences/signs/cones
- flat-shaded terrain
- low-poly crew/aid tables

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
- simple low-poly humanoid
- clear head/torso/arm/leg shapes
- strong silhouette in portrait
- obvious forward direction
- readable posture
- black kit with a bright accent if useful
- simple fake shadow

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
- shade tent if easy
- second aid marker / banner

Keep props simple and reusable.

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

Rough, readable, hot, and tense wins.
