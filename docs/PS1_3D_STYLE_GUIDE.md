# PS1 3D Style Guide

## Visual Target

The game should look like a lost PlayStation-era trail ultra game.

Not modern realistic.

Not pixel-art 2D.

Not cartoony.

The target is:

> Low-poly 3D canyon heat with a tactical SUC HUD in a portrait mobile frame.

## Keywords

- PS1
- low-poly
- dusty
- foggy
- hot
- serious
- angular
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
- angular canyon walls
- blocky rocks
- low-poly trees
- simple fences/signs/cones
- flat-shaded terrain
- low-poly crew table

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

V1 runner can be:
- capsule/body blocks
- low-poly humanoid
- simple black kit
- bright accent
- visible arms/legs if easy

Do not block on animation.

A placeholder runner is acceptable if the game feels playable.

## Animation

Early animation can be simple:
- bobbing motion
- basic leg swing
- speed-based motion intensity

Avoid complex animation trees.

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
- crew/final distance
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
- warning states visible without covering steering/brake zones
- large tap targets for pace, cooling, crew, pause, and restart
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

## Crew Zone Visuals

Foresthill crew start should include:
- folding table
- coolers
- water jugs
- orange cones
- SUC sign
- simple crew silhouettes
- shade tent if easy

The crew zone should feel human and grounded.

## Anti-Goals

Do not build:
- realistic AAA terrain
- detailed character creator
- motion-captured animation
- huge asset packs
- real-world map rendering
- complex foliage
- cinematic cutscenes
- giant open environment

Rough, readable, hot, and tense wins.
