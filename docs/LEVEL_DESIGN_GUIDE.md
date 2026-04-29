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
        |
[Fast Downhill Rollout]
        |
[Steeper Cal Street Drop]
        |
[Curves / Switchbacks]
        |
[River Crossing: water or log choice]
        |
[Short Uphill Heat Check]
        |
[Second Aid Station]
        |
[Final Downhill Survival Push]
        |
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
- readable switchbacks
- river/log decision

Late:
- second aid reset
- harder final pressure
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

## Curves

Curves should make the route feel natural and force line choice.

Rules:
- preview curves early
- avoid blind punishment
- reward speed control
- use trail edge contrast
- let fast and safe lines read clearly

## Switchbacks

Switchbacks should create control pressure without turning the mission into a maze.

Rules:
- use sparingly
- make entry speed matter
- make braking/control helpful
- show the turn before the player is committed
- avoid tiny precision steering on mobile

Effects:
- high speed can cause speed loss, quad damage, or control wobble
- good braking preserves quads and line

## Steeper Downhill Sections

Steeper downhill sections create temptation.

Rules:
- grade should be readable before entry
- speed should build faster
- Push/Send should feel exciting and expensive
- braking/control should feel useful
- steep sections should increase quad damage risk

These sections create tension, not cheap punishment.

## Short Uphill Section

The uphill exists to interrupt rhythm.

Rules:
- one short uphill only
- heat and effort rise
- speed drops
- low hydration hurts more
- place it after the river crossing to make recovery decisions matter

Do not turn the mission into a climb-heavy course.

## River Crossing Placement

The river crossing should be a memorable mid-mission terrain feature.

Placement goals:
- after enough downhill that speed/heat/quad state matters
- before the short uphill
- far enough from the second aid station that the crossing still has consequences
- visible on approach

Water route:
- wider and safer
- slower
- maybe slight cooling
- should not feel like a trap

## Log Crossing Placement

The log is the faster risky crossing line.

Rules:
- place with a fair setup
- make it visually obvious
- make control/braking matter
- keep it broad enough to read on a phone
- do not place many logs in a row

One memorable log crossing is stronger than repeated platformer obstacles.

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

## Second Aid Station

The second aid station creates a tactical reset before the final push.

Placement goals:
- after river and uphill pressure
- before final downhill survival push
- clear enough that the player knows it is a support moment

Choices should be quick:
- hydration
- cooling
- fuel/support
- skip to save time

The station should not become a full management sim.

## Final Survival Push

The final push should test everything:
- heat carried from exposure and uphill
- hydration after crew and second aid
- quad damage from steep downhill and turns
- time lost or saved at river/log
- cooling decisions

The finish should appear late enough to feel earned.

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
- curves and switchbacks are readable
- steeper downhill and short uphill affect resources
- river water slows the runner
- log crossing offers a faster/riskier line
- second aid station affects the final push
- heat and quad damage are affected by level sections
- touch controls and HUD do not hide critical trail information
- it can be completed in 3-7 minutes

## Avoid

- giant terrain
- branching trail networks
- exact real course replication
- confusing maze layouts
- long empty sections
- invisible hazards
- unfair turns
- cheap platformer log spam
- complex water simulation
- landscape-only readability
