# Mechanics Spec

## Design Priority

The game should be simple to play but tense to manage.

The player should not need a manual.

Every mechanic should answer one question:

> Does this make the run feel hotter, harder, more tactical, or more SUC?

## Core Resources

### Heat

Heat is the main danger.

Range:
```txt
0–100
```

At 100, the player collapses.

Heat rises from:
- time
- exposure
- pace
- low hydration
- climbs
- poor cooling

Heat falls from:
- ice
- water dump
- shade
- slowing down
- crew support

Heat warning bands:

```txt
0–49: manageable
50–74: hot
75–89: danger
90–99: critical
100: collapse
```

### Hydration

Hydration supports heat control.

Range:
```txt
0–100
```

Hydration drains from:
- time
- pace
- heat
- exposure

Low hydration should make heat rise faster.

Warning bands:

```txt
100–60: good
59–30: low
29–10: critical
9–0: disaster
```

### Fatigue

Fatigue represents accumulated damage.

Range:
```txt
0–100
```

Fatigue rises from:
- time
- high heat
- aggressive pace
- low hydration
- hazards

At high fatigue:
- speed may drop
- steering may feel heavier
- pace changes may be less effective

Keep this subtle at first.

### Ice Active

Ice is a temporary cooling buff.

Range:
```txt
0–100 or seconds remaining
```

While active:
- heat gain is reduced
- heat may slowly drop
- warning state calms slightly

Ice should feel powerful but temporary.

## Pace Modes

### Easy

Purpose:
- survival
- heat control
- recovery

Effects:
- lowest speed
- lowest heat gain
- lowest hydration drain
- lowest fatigue gain

### Steady

Purpose:
- default race rhythm

Effects:
- normal speed
- normal heat gain
- normal resource drain

### Push

Purpose:
- tactical speed

Effects:
- faster speed
- higher heat gain
- higher hydration drain
- higher fatigue gain

### Send

Purpose:
- risky surge

Effects:
- fastest speed
- major heat gain
- major hydration drain
- major fatigue gain
- should punish long use

## Trail Zones

### Shade

Effects:
- reduces heat gain
- maybe slightly recovers heat

### Exposed

Effects:
- increases heat gain

### Descent

Effects:
- allows speed
- can increase fatigue if using Push/Send too long

### Climb

Effects:
- lower speed
- higher heat gain
- higher fatigue

### Crew Zone

Effects:
- allows quick choices
- refills resources
- costs time

### Technical Trail

Effects:
- hazards more common
- bad line choice has penalties

## Crew Actions

### Refill Bottles

Effect:
- restores hydration

Cost:
- medium time

### Ice Bandana

Effect:
- adds strong Ice Active duration

Cost:
- medium-high time

### Water Dump

Effect:
- immediate heat reduction

Cost:
- low time

### Grab Gels

Effect:
- restores fuel or future fuel

Cost:
- low-medium time

### Calm Down

Effect:
- reduces fatigue or heat panic

Cost:
- medium time

### Leave Fast

Effect:
- exits crew immediately

Cost:
- no extra time

Risk:
- may leave without enough support

## Hazards

Hazards should be simple.

Examples:
- rocks
- heat shimmer patches
- bad line zones
- mental spiral zones
- dry creek bed

Hazard penalties:
- heat spike
- hydration loss
- fatigue gain
- speed loss

Do not add enemy AI early.

## Run Report Stats

Track:

- finish/fail
- elapsed time
- max heat
- lowest hydration
- final fatigue
- pace usage
- crew actions taken
- hazards hit
- cooling uses
- verdict

## Tuning Rule

Keep all tuning constants in one obvious place once implementation starts.

Suggested future file:

```txt
src/game/constants.ts
```

Examples:
- heat gain by pace
- hydration drain by pace
- cooling strength
- crew action effects
- fatigue gain
- mission length

This makes AI tuning runs safer.
