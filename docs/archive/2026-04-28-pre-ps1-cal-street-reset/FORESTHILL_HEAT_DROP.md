# Mission Spec — Foresthill Heat Drop

## Mission Summary

**Foresthill Heat Drop** is the first mission for `SUC: The Long Burn`.

It is a fictionalized Western States-inspired trail section. The player starts near a Foresthill-style crew zone and drops into hot, exposed canyon terrain. The challenge is to manage descent speed, heat, hydration, and cooling before reaching the finish.

This mission should teach the whole game.

## One-line Mission Pitch

Start strong, stay cool, do not bomb the descent, and survive the canyon heat long enough to reach the next checkpoint.

## Mission Fantasy

The player should feel like they just left crew and are entering a dangerous section.

At first, everything feels good.

Then the heat starts building.

Then hydration starts dropping.

Then the player realizes they either executed well at crew or they are about to pay for it.

## Route Inspiration

Inspired by:
- Foresthill
- Western States canyon sections
- Cal Street energy
- Auburn trail culture
- hot exposed ultra-running
- SUC training route mythology

Do not use exact real-world course data in V1.

## Mission Structure

### Segment 1 — Rollout

The opening section is forgiving.

Purpose:
- teach controls
- introduce pace
- show heat/hydration HUD
- let player feel movement

Conditions:
- mild descent
- some shade
- low hazard density
- heat rises slowly

### Segment 2 — Exposed Drop

The canyon starts cooking.

Purpose:
- make pace matter
- punish reckless sending
- introduce cooling decisions

Conditions:
- more exposure
- faster heat gain
- hydration drains faster
- more trail hazards
- fewer shade breaks

### Segment 3 — Crew Check / Aid Zone

The player reaches a crew/aid point.

Purpose:
- introduce triage
- create decision pressure
- let the player recover but lose time

Possible actions:
- refill bottles
- ice bandana
- water dump
- grab gels
- calm down
- leave fast

### Segment 4 — Heat Debt Push

The final section determines whether the player survives.

Purpose:
- test the player’s previous decisions
- make heat/hydration/fatigue matter
- create the “hold it together” feeling

Conditions:
- high heat pressure
- limited shade
- fatigue consequences
- finish line visible near the end

## Mission Stats

Initial V1 values can be fake and tuned later.

```txt
Mission Length: 1000 progress units
Target Finish Time: 4–6 minutes
Heat Risk: High
Hydration Risk: High
Fatigue Risk: Medium
Crew Access: One mid-mission stop
Technical Difficulty: Low-medium
Primary Skill: Heat management
Secondary Skill: Pacing discipline
```

## Route Intel Card

Example route card:

```txt
SUC ROUTE INTEL

MISSION: FORESTHILL HEAT DROP
THREAT: HEAT / DESCENT DAMAGE
CREW ACCESS: MIDPOINT
SHADE: UNRELIABLE
STRATEGY: ICE BEFORE THE FINAL PUSH. DO NOT SEND EARLY.

BAD IDEA INDEX: 8/10
```

## Win Conditions

The player wins by reaching the finish before collapse.

Scoring should consider:
- finish time
- max heat
- hydration low point
- crew efficiency
- pace discipline
- hazards hit

## Failure Conditions

The player fails if:
- heat reaches 100%
- hydration reaches 0% and fatigue maxes out
- fatigue reaches 100%

Initial V1 can use only heat failure and finish success.

## Crew Zone Behavior

When entering the crew zone:
- slow or pause gameplay
- show quick choices
- allow limited actions
- each action costs time
- choices affect resources

Example V1 crew menu:

```txt
CREW ZONE

Choose 3:

[1] Refill bottles
[2] Ice bandana
[3] Water dump
[4] Grab gels
[5] Calm down
[6] Leave now
```

## Mission-Specific Warnings

Use short warning text.

Examples:
- HEAT DEBT RISING
- ICE IS GONE
- HYDRATION LOW
- DO NOT BOMB THIS
- CREW IN 0.2
- SHADE WON'T SAVE YOU
- FINAL PUSH
- CANYON TAX COLLECTED

## Mission Verdicts

Finish verdicts:
- Finished cooked.
- Controlled the burn.
- Crew saved your race.
- Ugly, but alive.
- You respected the canyon.

Failure verdicts:
- Cooked before the checkpoint.
- Hydration plan: criminal.
- You sent it like a clown.
- The canyon collected interest.
- SUC group chat will hear about this.

## V1 Acceptance

Foresthill Heat Drop V1 is done when:
- the player can start the mission
- the mission has a visible beginning and end
- heat and hydration matter
- there is at least one crew zone
- the player can finish or fail
- a run report appears
- the mission can be replayed immediately
