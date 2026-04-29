# Mission Spec — Cal Street Heat Drop

## Mission Summary

**Cal Street Heat Drop** is the first mission for `SUC: The Long Burn`.

It is a fictionalized, portrait-mode mobile, touchscreen-first PS1-style 3D downhill trail section inspired by the Cal Street / Foresthill energy of Western States.

It should feel serious, hot, exposed, and dangerous.

This is not an exact recreation of a real trail.

It is a playable myth version:
- phone-first portrait framing
- touch-driven line choice and restraint
- Foresthill-style crew start
- fast downhill rhythm
- exposed canyon heat
- technical turns
- shade pockets
- quad damage risk
- final survival push

## One-line Mission Pitch

Leave Foresthill, descend hard, manage the heat, save your quads, and reach the next checkpoint without detonating.

## Mission Fantasy

At the start, the player feels strong.

The trail points downhill.

Speed comes easy.

That is the trap.

The mission should teach:

> Downhill speed is free until it sends you the bill.

## Route Intel Card

```txt
SUC ROUTE INTEL

MISSION: CAL STREET HEAT DROP
STYLE: DOWNHILL SURVIVAL
THREAT: HEAT / QUAD DAMAGE
CREW ACCESS: START ONLY
SHADE: UNRELIABLE
STRATEGY: CONTROL EARLY. ICE SMART. DO NOT BOMB THE DESCENT.

BAD IDEA INDEX: 9/10
```

## Mission Structure

### Zone 1 — Foresthill Crew Start

Purpose:
- set the tone
- introduce crew choice
- give the player resources before descent

Player chooses limited support actions.

Crew interaction is touch-first: choices should be large, fast to read, and easy to tap before the descent starts.

Possible actions:
- refill bottles
- ice bandana
- water dump
- grab gels
- calm down
- leave fast

Mood:
- crew chaos
- folding table
- coolers
- orange cones
- harsh sun
- serious start energy

### Zone 2 — Fast Rollout

Purpose:
- make the player feel strong
- teach downhill momentum
- create temptation

Conditions:
- downhill grade
- wide-ish trail/road
- low obstacle density
- manageable heat
- speed feels easy

Design note:
The player should want to push here.

### Zone 3 — Exposed Drop

Purpose:
- reveal the cost of speed
- start heating the player up

Conditions:
- fewer shade pockets
- faster heat gain
- sharper turns
- more rocks
- hydration drains faster
- quad damage starts accumulating

Design note:
This zone should punish players who used Send too much early.

### Zone 4 — Technical Heat Section

Purpose:
- combine line choice, heat, and damage

Conditions:
- narrow trail
- rocky lines
- shade vs smooth-line tradeoffs
- exposed corners
- speed control matters

Possible line choices:
- fast line, more exposure
- rocky shade line, more quad/impact risk
- safe line, slower

### Zone 5 — Final Survival Push

Purpose:
- test the whole run

Conditions:
- high heat pressure
- limited cooling
- damaged quads hurt pace
- finish line appears late
- warnings become intense

Design note:
The player should feel like earlier choices are now catching up.

## Mission Length

Initial target:

```txt
Play time: 3–7 minutes
Distance abstraction: 1000–1500 progress units
Crew zones: 1 at start
Cooling opportunities: limited
Failure pressure: high
```

## Core Mission Variables

Track:
- progress
- elapsed time
- heat
- hydration
- quad damage
- ice active
- pace mode
- braking/control usage
- crew choices
- hazards hit
- finish/failure state

Also track whether touch controls remain usable during high-pressure states; warning effects should never make primary controls ambiguous.

## Terrain Feel

The trail should include:
- downhill grade
- turns
- exposed open sections
- sparse shade
- low-poly trees
- rocks
- dust
- trail markers
- canyon fog
- simple distant terrain

## Hazards

Early hazards:
- rocks
- rough trail patches
- exposed heat zones
- bad line zones
- sharp turns

Hazard effects:
- quad damage
- heat spike
- speed loss
- hydration loss
- control wobble

## Crew Start Choices

V1 crew choices:

### Refill Bottles
Restores hydration.

### Ice Bandana
Starts or stores an ice/cooling charge.

### Water Dump
Immediate heat reduction.

### Grab Gels
Optional fuel support later.

### Calm Down
Small fatigue/quad-control benefit.

### Leave Fast
Saves time but gives no extra support.

## Failure Causes

Possible failure labels:
- Overheated
- Dehydration collapse
- Quad damage collapse
- Blew up on the descent
- Under-crewed
- Sent too early

## Success Grades

Grade the run by:
- finish time
- max heat
- lowest hydration
- final quad damage
- crew choices
- pace discipline

## Verdict Lines

Serious/SUC-flavored:

- Controlled the burn.
- Fast early. Expensive late.
- Canyon tax collected.
- Crew saved your race.
- You bombed the descent and paid for it.
- Good restraint. Strong finish.
- Finished cooked, but finished.
- Not pretty. Very SUC.
- Cal Street took a chunk out of you.
- You lived. Do it cleaner next time.

## V1 Acceptance

Cal Street Heat Drop V1 is done when:

- game loads into a 3D downhill mission
- layout is portrait mobile first
- third-person camera works
- player can steer with touch
- player can brake/control descent with touch
- heat rises
- hydration drains
- quad damage accumulates
- crew start choices affect the run and are tappable
- player can finish or fail
- report appears
- replay works
