# Mission Spec - Cal Street Heat Drop

## Mission Summary

**Cal Street Heat Drop** is the first mission for `SUC: The Long Burn`.

It is a fictionalized, portrait-mode mobile, touchscreen-first PS1-style 3D downhill trail section inspired by the Cal Street / Foresthill energy of Western States.

It should feel serious, hot, exposed, technical, and dangerous.

This is not an exact recreation of a real trail.

It is a playable myth version:
- phone-first portrait framing
- touch-driven line choice and restraint
- Foresthill-style crew start
- fast downhill rhythm
- steeper canyon drops
- curves and switchbacks
- exposed canyon heat
- river crossing terrain
- faster/riskier log crossing line
- one short uphill heat check
- second aid station / support point
- shade pockets
- quad damage risk
- final survival push

## One-line Mission Pitch

Leave Foresthill, descend hard, cross the canyon water cleanly, manage the heat, save your quads, use the second aid station well, and reach the finish without detonating.

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
THREAT: HEAT / QUAD DAMAGE / WATER RHYTHM
CREW ACCESS: START + SECOND AID
SHADE: UNRELIABLE
KEY CHOICE: SAFE WATER OR FAST LOG
STRATEGY: CONTROL EARLY. ICE SMART. DO NOT BOMB THE DESCENT.

BAD IDEA INDEX: 9/10
```

## Mission Structure

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

### Zone 1 - Foresthill Crew Start

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

### Zone 2 - Fast Downhill Rollout

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

### Zone 3 - Steeper Cal Street Drop

Purpose:
- reveal the cost of speed
- make quad damage feel specific to downhill running

Conditions:
- steeper visible grade
- faster acceleration
- higher quad damage risk
- higher control pressure
- clear warning before entry

Design note:
The grade should be readable before the player is inside it. It creates tension, not cheap punishment.

### Zone 4 - Curves / Switchbacks

Purpose:
- combine line choice, braking, and downhill control

Conditions:
- naturally curving trail
- one or more switchback-style turns if useful
- braking matters before the turn
- fast outside line versus safer controlled line
- warning markers readable in portrait

Design note:
Switchbacks should increase control pressure without making the route feel like a maze.

### Zone 5 - River Crossing: Water or Log Choice

Purpose:
- give the canyon terrain mechanical identity
- interrupt pace rhythm
- create a memorable safe/slow versus fast/risky decision

Water route:
- slower
- safer
- deeper sections slow more if represented
- may reduce heat slightly
- interrupts pace rhythm

Log route:
- faster
- narrower and more demanding
- requires better steering/control
- missing or falling off the log slows the runner
- may add fatigue or quad damage

Design note:
This should feel like crossing canyon terrain, not playing a platformer. One memorable log crossing is better than many cheap ones.

### Zone 6 - Short Uphill Heat Check

Purpose:
- interrupt the downhill rhythm
- punish poor heat/hydration decisions
- make the player feel effort rise after the crossing

Conditions:
- short climb only
- slower speed
- higher effort/heat
- hydration pressure matters

Design note:
The uphill should be short and purposeful. Do not turn the mission into a climb-heavy course.

### Zone 7 - Second Aid Station

Purpose:
- create a tactical reset before the final push
- make earlier choices visible without ending the mission

Possible quick choices:
- top off hydration
- quick ice/cooling reset
- water dump
- grab fuel
- skip to save time

Effects:
- hydration
- cooling
- fuel/support
- time
- final survival odds

Design note:
Second aid is not a full management sim. It should be a fast pressure decision.

### Zone 8 - Final Downhill Survival Push

Purpose:
- test the whole run

Conditions:
- high heat pressure
- limited remaining cooling
- damaged quads hurt pace
- downhill temptation returns
- finish line appears late
- warnings become intense

Design note:
The player should feel like earlier choices are now catching up.

## Mission Length

Initial target:

```txt
Play time: 3-7 minutes
Distance abstraction: 1000-1500 progress units
Crew zones: start + second aid station
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
- second aid choice
- water/log crossing outcome
- hazards hit
- finish/failure state

Also track whether touch controls remain usable during high-pressure states. Warning effects should never make primary controls ambiguous.

## Terrain Feel

The trail should include:
- downhill grade
- steeper downhill grade
- curves
- switchbacks
- one short uphill
- river water
- a readable log crossing
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
- steep downhill entry
- water slowdown
- missed log crossing

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

## Second Aid Choices

Second aid should reuse the same spirit with fewer choices and faster resolution.

Possible choices:
- top off hydration
- quick ice reset
- water dump
- grab fuel
- skip

The second aid station should help the final push but cost time.

## Failure Causes

Possible failure labels:
- Overheated
- Dehydration collapse
- Quad damage collapse
- Blew up on the descent
- Under-crewed
- Skipped aid and paid
- Sent too early
- Botched the crossing

## Success Grades

Grade the run by:
- finish time
- max heat
- lowest hydration
- final quad damage
- crew choices
- second aid choice
- pace discipline
- crossing choice/outcome

## Verdict Lines

Serious/SUC-flavored:

- Controlled the burn.
- Fast early. Expensive late.
- Canyon tax collected.
- Crew saved your race.
- The second aid stop saved the back half.
- You bombed the descent and paid for it.
- Good restraint. Strong finish.
- Finished cooked, but finished.
- The log was faster. Your quads disagree.
- Water was slow. Still smarter than detonating.
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
- terrain includes readable curves, steep downhill, and one short uphill
- river water slows the runner
- log crossing provides a faster/riskier line choice
- second aid station affects the final push
- player can finish or fail
- report appears
- replay works
