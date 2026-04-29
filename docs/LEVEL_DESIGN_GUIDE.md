# Level Design Guide

## Core Level Rule

Build one corridor.

Make it feel dangerous.

Frame it for portrait mobile first.

Do not build an open world.

## Mission Shape

`Cal Street Heat Drop` should be a downhill trail corridor with zones.

Recommended structure:

```txt
[Foresthill Crew Start]
        ↓
[Fast Rollout]
        ↓
[Exposed Drop]
        ↓
[Technical Heat Section]
        ↓
[Final Survival Push]
        ↓
[Finish]
```

## Trail Width

Keep the trail wide enough for control.

Early:
- wider rollout
- forgiving steering

Middle:
- narrower path
- more line choice

Late:
- harder turns
- more heat pressure
- less margin

## Downhill Feel

Use:
- visible slope
- camera angle
- increasing speed
- trail curves
- foreground motion
- dust/rocks
- descent warnings

The player should feel gravity inviting bad decisions.

Because the primary viewport is tall and narrow, the trail needs strong forward readability: clear horizon, readable upcoming turns, and hazards visible early enough for thumb input.

## Turns

Turns should create pacing pressure.

A turn can punish:
- too much speed
- late braking
- bad line choice

Do not make turns unfair.

The player needs readable warning.

Warnings should be visible in portrait without crowding the runner or the touch controls.

## Exposure Zones

Exposure zones increase heat.

Visual language:
- brighter ground
- fewer trees
- open sky
- orange tint
- heat shimmer
- warning HUD

## Shade Zones

Shade zones reduce heat pressure.

Visual language:
- trees
- darker ground
- cooler tint
- lower heat gain

Shade can be placed off the fastest line to create choice.

## Technical Sections

Technical sections increase quad damage risk.

Visual language:
- rocks
- uneven ground
- narrow trail
- warning markers

Effects:
- speed loss
- quad damage
- control wobble if hit too fast

## Crew Start

The mission starts at crew.

This is important.

The player should make decisions before descending.

Crew start should not become a full menu sim. It is a quick tactical setup.

Crew choices should be large tappable controls that work cleanly on a phone.

## Finish

The finish should feel like relief.

Visuals:
- checkpoint arch or sign
- crew/aid marker
- brighter clearing
- route report trigger

## V1 Level Acceptance

The level is acceptable when:
- it has a clear start and end
- the player can tell they are descending
- there are distinct zones
- there is at least one meaningful fast-vs-safe decision
- heat and quad damage are affected by level sections
- touch controls and HUD do not hide critical trail information
- it can be completed in 3–7 minutes

## Avoid

- giant terrain
- branching trail networks
- exact real course replication
- confusing maze layouts
- long empty sections
- invisible hazards
- unfair turns
- landscape-only readability
