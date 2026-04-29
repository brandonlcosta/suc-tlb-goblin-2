# Mechanics Spec

## Design Priority

This is a downhill ultra survival game.

It is designed first for portrait-mode mobile play with touchscreen input. Mechanics should remain readable and controllable on a phone held vertically.

The important question is:

> How much speed can the player take before heat, hydration, quad damage, terrain, and bad crossing choices destroy the run?

Every mechanic should support that question.

Keep mechanics lightweight. Do not over-simulate physics.

## Core Resources

### Heat

Range:

```txt
0-100
```

At 100, the player collapses.

Heat rises from:
- exposure
- pace
- high downhill effort
- uphill effort
- low hydration
- lack of cooling
- technical stress

Heat drops from:
- ice
- water dump
- shade
- slowing down
- crew support
- second aid support
- possible small water-crossing cooling

Heat warning bands:

```txt
0-49: controlled
50-74: hot
75-89: danger
90-99: critical
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
0-100
```

Hydration drains from:
- time
- pace
- heat
- exposure
- uphill effort

Low hydration:
- increases heat gain
- weakens recovery
- increases fatigue
- worsens short uphill pressure
- worsens final-section control

Hydration warning bands:

```txt
100-60: good
59-30: low
29-10: critical
9-0: disaster
```

### Quad Damage

Range:

```txt
0-100
```

Quad damage is the downhill-specific threat.

It rises from:
- high speed on descents
- steeper downhill sections
- using Push/Send too long
- late braking
- hitting rocks/rough trail
- bad line choice
- technical downhill turns
- missed or failed log crossings

High quad damage:
- reduces top speed
- increases fatigue
- makes braking less effective
- worsens final push
- damages run report

Quad warning bands:

```txt
0-35: fresh
36-65: loaded
66-85: cooked
86-100: wrecked
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
- safer switchbacks/log attempts

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
- harder control through curves and logs

### Send

Purpose:
- risky downhill bomb

Effects:
- fastest speed
- major heat gain
- major quad damage
- major late-section cost
- dangerous through switchbacks, steep drops, and log crossings

Send should feel good immediately and expensive later.

## Braking / Control Input

The player needs a manual way to control descent.

Suggested behavior:
- hold a thumb brake/control button or press-and-hold control zone to reduce speed
- braking lowers immediate risk
- braking can reduce future quad damage
- braking costs time
- braking helps before switchbacks, steeper drops, and log crossings
- panic braking at very high speed may still cause damage

Do not over-simulate physics early.

Keyboard braking can exist as a desktop fallback, but touch is the primary design target.

## Terrain Modifiers

### Steeper Downhill

Purpose:
- increase speed temptation
- increase quad damage risk
- increase control pressure

Rules:
- player should see the section before entering it
- pace and braking matter more
- Send is especially risky
- Control should feel slow but smart

### Short Uphill

Purpose:
- interrupt downhill rhythm
- punish poor heat/hydration management

Rules:
- short duration only
- speed drops
- effort/heat rises
- low hydration makes it harsher
- do not turn the mission into a climb-heavy course

### Curves and Switchbacks

Purpose:
- reward braking and line choice
- make the corridor feel natural

Rules:
- turns must be readable and fair
- high speed increases control pressure
- switchbacks may raise quad damage if attacked too hard
- avoid maze layouts

## Water Terrain

Water is terrain, not decoration.

Rules:
- entering water slows the runner
- deeper water slows more if depth is represented
- water may reduce heat slightly
- water can interrupt pace rhythm
- water route is safer than the log route
- water should not behave like complex fluid simulation

Suggested lightweight effects:
- speed multiplier while in water
- stronger multiplier for deep water
- small heat reduction or temporary heat gain reduction
- splash visual/audio feedback later

## Log Crossing

Logs across river sections are a line-choice mechanic.

Rules:
- log route is faster than splashing through water
- log requires better steering/control
- braking/control improves success margin
- falling/missing the log drops the player into water or a slowdown state
- failure may add small fatigue or quad damage
- one memorable log crossing is better than many cheap ones

Keep it readable. The player should know what they attempted and why it failed.

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

### Water Line
- slower
- safer
- small possible cooling

### Log Line
- faster
- riskier
- requires better control

Line choice does not need to be complex at first. It just needs to be visible and meaningful.

On mobile, line choice should work through thumb steering or drag input without requiring precise cursor-like aiming.

## Crew and Aid Actions

The first mission starts with crew and later includes a second aid station.

Actions should be presented as large tappable choices. The support moment should be fast enough to operate on a phone without turning into menu management.

### Refill Bottles

Effect:
- hydration restored

Cost:
- time

### Ice Bandana / Ice Reset

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

### Leave Fast / Skip Aid

Effect:
- saves time

Risk:
- underprepared descent or final push

## Animation Feedback States

Animation should communicate state without a large animation system.

Useful states:
- basic run cycle
- downhill lean when speed/grade rises
- braking / controlled descent posture
- heavier wobble under high quad damage
- optional stumble on failed log or rough impact
- optional water-splash step animation later

Do not build complex animation trees early.

## Touch Control Requirements

Primary actions:
- steer / choose line
- brake / control descent
- select pace
- use cooling
- choose crew/aid action
- pause / restart

All primary actions must be available through touch controls in portrait orientation. Keyboard shortcuts are optional fallback inputs, not acceptance criteria by themselves.

## Failure Conditions

Initial:
- heat reaches 100

Next:
- hydration reaches 0 and fatigue/heat penalty escalates
- quad damage reaches 100 or causes collapse
- failed terrain/crossing decisions contribute to collapse through speed loss, heat, or quad damage

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
- second aid choice
- hazards hit
- cooling uses
- water/log crossing choice and outcome if implemented
- steep/uphill/switchback penalties if tracked
- failure cause
- verdict
- next-run advice

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
- steep downhill modifiers
- uphill modifiers
- water slowdown
- water cooling strength
- log crossing risk
- cooling strength
- crew/aid effects
- zone modifiers
- mission length
