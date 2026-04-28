# Visual Style Guide

## Visual Target

Retro. Pixelated. Gritty. SUC-coded.

The game should feel like an old-school endurance arcade game from an alternate universe where trail ultras became a genre.

Not cute.
Not corporate.
Not generic fitness.

## Keywords

- retro pixel
- dusty
- canyon heat
- tactical HUD
- blacktop shimmer
- neon warning text
- orange trail markers
- folding table aid station
- SUC dirt mythology
- low-res but intense

## Camera Style

The game should feel third-person.

Best V1 approach:
- pseudo-3D trail corridor
- runner near bottom-center screen
- trail scrolling toward player
- objects scale as they approach
- slight horizontal steering
- pixelated/chunky rendering

This is enough to create third-person feel without full 3D scope.

## Resolution Feel

Use a low internal resolution if possible.

Example:
- render to low-res canvas
- scale up with pixelated smoothing disabled

The game should look intentionally chunky.

## Color Palette

Suggested palette categories:

### Base

- near-black
- dusty brown
- faded tan
- dark olive
- asphalt gray

### Heat

- hot red
- warning orange
- sun yellow

### SUC / Tactical Accents

- neon green
- off-white
- sharp cyan only if needed
- stencil white

### Danger

- red
- pulsing orange
- distorted dark overlay

## HUD Style

The HUD should feel like SUC route intel, not a generic health bar.

HUD elements:
- route name
- progress
- pace mode
- heat
- hydration
- fatigue
- ice active
- crew distance
- warning text

Text should be short and aggressive.

Examples:
- HEAT DEBT
- HYDRATION
- ICE ACTIVE
- CREW IN 0.3
- FINAL PUSH
- DO NOT SEND

## Runner Style

V1 runner can be simple:
- pixel sprite
- small animated legs
- hat/headband color
- black kit
- bright accent
- maybe white arm sleeves

Do not block on animation.

A simple two-frame running animation is enough.

## Trail Style

The trail corridor should include:
- dirt path
- rocks
- brush
- shade patches
- exposed red/orange zones
- occasional trail markers
- heat shimmer overlay

## Crew Zone Style

Crew zone should be instantly readable.

Possible elements:
- folding table
- cooler
- water jug
- orange cones
- SUC sign
- crew silhouettes
- ice bucket
- hand-written board

V1 can use rectangles and text.

## Warning Effects

When heat is high:
- HUD flashes
- heat bar pulses
- screen tint warms
- mild shake
- trail shimmer
- warning text appears

Do not overdo it so the game remains readable.

## Font Direction

Use a pixel font if easy.

If not:
- use system monospace
- uppercase labels
- tight text
- high contrast

Avoid polished rounded app UI.

## Visual Anti-Goals

Do not build:
- realistic 3D terrain
- high-poly characters
- detailed animation trees
- cinematic cutscenes
- complex lighting
- massive environment art
- photorealism
- real map rendering

The game should be readable, fast, and weird.
