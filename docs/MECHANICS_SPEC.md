# Mechanics Spec

## Design Priority

This is a downhill ultra survival game.

It is designed first for portrait-mode mobile play with touchscreen input. Mechanics should remain readable and controllable on a phone held vertically.

The important question is:

> How much speed can the player take before heat, hydration, and quad damage destroy the run?

Every mechanic should support that question.

## Core Resources

### Heat

Range:

```txt
0–100
```

At 100, the player collapses.

Heat rises from:
- exposure
- pace
- high downhill effort
- low hydration
- lack of cooling
- technical stress

Heat drops from:
- ice
- water dump
- shade
- slowing down
- crew support

Heat warning bands:

```txt
0–49: controlled
50–74: hot
75–89: danger
90–99: critical
100: collapse
```

High heat effects:
- HUD flashes
- audio pressure
- screen shimmer
- control instability
- harsher report grade

### Hydration

Range:

```txt
0–100
```

Hydration drains from:
- time
- pace
- heat
- exposure

Low hydration:
- increases heat gain
- weakens recovery
- increases fatigue
- worsens final-section control

Hydration warning bands:

```txt
100–60: good
59–30: low
29–10: critical
9–0: disaster
```

### Quad Damage

Range:

```txt
0–100
```

Quad damage is the downhill-specific threat.

It rises from:
- high speed on descents
- using Push/Send too long
- late braking
- hitting rocks/rough trail
- bad line choice
- technical downhill turns

High quad damage:
- reduces top speed
- increases fatigue
- makes braking less effective
- worsens final push
- damages run report

Quad warning bands:

```txt
0–35: fresh
36–65: loaded
66–85: cooked
86–100: wrecked
```

### Ice Active

Represents cooling currently working.

While active:
- heat gain is reduced
- heat may slowly drop
- critical warning is softened

Ice should be temporary and valuable.

## Pace Modes

### Control

Purpose:
- restraint
- descent management
- survival

Effects:
- slower speed
- lower heat gain
- lower hydration drain
- lower quad damage

### Steady

Purpose:
- normal race rhythm

Effects:
- baseline speed and resource drain

### Push

Purpose:
- tactical acceleration

Effects:
- higher speed
- higher heat
- higher hydration drain
- higher quad damage

### Send

Purpose:
- risky downhill bomb

Effects:
- fastest speed
- major heat gain
- major quad damage
- major late-section cost

Send should feel good immediately and expensive later.

## Braking / Control Input

The player needs a manual way to control descent.

Suggested behavior:
- hold a thumb brake/control button or press-and-hold control zone to reduce speed
- braking lowers immediate risk
- braking can reduce future quad damage
- braking costs time
- panic braking at very high speed may still cause damage

Do not over-simulate physics early.

Keyboard braking can exist as a desktop fallback, but touch is the primary design target.

## Line Choice

The trail should offer simple decisions.

Line types:

### Smooth Fast Line
- faster
- more exposed
- more heat

### Shaded Line
- less heat
- may be rockier/slower

### Rocky Line
- more quad damage risk
- possible speed disruption

### Safe Line
- slower
- lower risk

Line choice does not need to be complex at first. It just needs to be visible and meaningful.

On mobile, line choice should work through thumb steering or drag input without requiring precise cursor-like aiming.

## Crew Actions

The first mission starts with crew.

Crew actions should be presented as large tappable choices. The crew moment should be fast enough to operate on a phone without turning into menu management.

### Refill Bottles

Effect:
- hydration restored

Cost:
- time

### Ice Bandana

Effect:
- gives cooling charge or starts ice active

Cost:
- time

### Water Dump

Effect:
- immediate heat drop

Cost:
- small time

### Grab Gels

Effect:
- optional fuel/morale support

Cost:
- time

### Calm Down

Effect:
- reduces early fatigue / control wobble

Cost:
- time

### Leave Fast

Effect:
- saves time

Risk:
- underprepared descent

## Touch Control Requirements

Primary actions:
- steer / choose line
- brake / control descent
- select pace
- use cooling
- choose crew action
- pause / restart

All primary actions must be available through touch controls in portrait orientation. Keyboard shortcuts are optional fallback inputs, not acceptance criteria by themselves.

## Failure Conditions

Initial:
- heat reaches 100

Next:
- hydration reaches 0 and fatigue/heat penalty escalates
- quad damage reaches 100 or causes collapse

Failure should always have a clear cause.

## Run Report Stats

Track:

- result
- elapsed time
- max heat
- lowest hydration
- final quad damage
- time spent in each pace
- braking/control usage
- crew choices
- hazards hit
- cooling uses
- failure cause
- verdict

## Tuning Rule

Keep tuning values centralized once implementation begins.

Suggested future file:

```txt
src/game/constants.ts
```

Examples:
- heat gain by pace
- hydration drain by pace
- quad damage by speed
- cooling strength
- crew effects
- zone modifiers
- mission length
