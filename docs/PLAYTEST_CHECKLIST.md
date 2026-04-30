# Playtest Checklist

Use this after every meaningful change.

## Startup

- [ ] App starts.
- [ ] Mission loads.
- [ ] Portrait mobile layout is used by default.
- [ ] No obvious console errors.
- [ ] Restart works.

## 3D / Camera

- [ ] Runner is visible.
- [ ] Camera follows correctly.
- [ ] Trail ahead is readable.
- [ ] Downhill direction is obvious.
- [ ] Curves are readable before entry.
- [ ] Switchbacks are readable and fair.
- [ ] Steeper downhill sections are visible before they punish the player.
- [ ] Fog/draw distance does not confuse navigation.
- [ ] Touch controls and HUD do not hide upcoming hazards.

## Controls

- [ ] Touch left/right steering works.
- [ ] Touch brake/control works.
- [ ] Touch pace controls work.
- [ ] Touch cooling control works if implemented.
- [ ] Touch crew interaction works if implemented.
- [ ] Touch second aid interaction works if implemented.
- [ ] Touch controls feel stable through curves, switchbacks, water, and logs.
- [ ] Keyboard fallback still works if present.

## Downhill Feel

- [ ] Speed feels tempting.
- [ ] Braking feels useful.
- [ ] Turns are readable.
- [ ] Fast lines and safe lines are understandable.
- [ ] Steep downhill increases temptation and quad risk.
- [ ] The short uphill interrupts rhythm without becoming the mission.
- [ ] Reckless descending has consequences.

## River / Log Crossing

- [ ] River crossing feels like canyon terrain.
- [ ] Water slows the runner.
- [ ] Deeper/slower water is readable if present.
- [ ] Water provides only a small cooling benefit if implemented.
- [ ] Log crossing is faster but riskier.
- [ ] Log approach is fair and readable.
- [ ] Failed/missed log attempts have clear feedback.
- [ ] The crossing does not feel like platformer spam.

## Resources

- [ ] Heat rises.
- [ ] Hydration drains.
- [ ] Quad damage accumulates.
- [ ] Cooling helps.
- [ ] Low hydration makes heat worse.
- [ ] High quad damage affects the finish.
- [ ] Water/uphill/steep sections modify resources clearly if implemented.

## Crew / Aid

- [ ] Crew start is visible.
- [ ] Crew choices are understandable.
- [ ] Choices affect the run.
- [ ] Leaving fast is risky.
- [ ] Second aid station is visible if implemented.
- [ ] Second aid choices are quick and tactical.
- [ ] Crew/aid feels SUC, not generic.

## Runner / Animation

- [ ] Runner silhouette is readable in portrait.
- [ ] Running direction is obvious.
- [ ] Basic run motion reads clearly.
- [ ] Downhill lean reads if implemented.
- [ ] Braking/control posture reads if implemented.
- [ ] High-quad wobble/stumble reads if implemented.
- [ ] Animation stays simple and PS1-style.

## Visual Style

- [ ] PS1 low-poly vibe is present.
- [ ] Environment feels hot/dry.
- [ ] River/log visuals fit the PS1 style.
- [ ] Second aid props fit the world if implemented.
- [ ] Runner stride, downhill lean, and braking posture read at gameplay size.
- [ ] Course markers use flags, ribbon, stakes, signs, or chute language instead of arches.
- [ ] Other runners add race atmosphere without confusing the player's route.
- [ ] Spectators/volunteers add event life without crowding the playable line.
- [ ] Trail surface detail improves place feel without visual noise.
- [ ] Retro polish improves heat, water, dust, fog, or distance without modern-realism drift.
- [ ] HUD is readable.
- [ ] HUD is readable on a portrait phone viewport.
- [ ] Warning states are clear.
- [ ] The style does not look like a modern generic runner.

## Mission

- [ ] Start is clear.
- [ ] Finish is clear.
- [ ] Mission lasts roughly 3-7 minutes when tuned.
- [ ] Player can finish.
- [ ] Player can fail.
- [ ] Replay is immediate.

## Run Report

- [ ] Report shows result.
- [ ] Time is shown.
- [ ] Max heat is shown.
- [ ] Lowest hydration is shown.
- [ ] Quad damage is shown.
- [ ] Crew and second aid choices are shown if relevant.
- [ ] River/log outcome is shown if relevant.
- [ ] Failure cause is shown if failed.
- [ ] Verdict fits the tone.
- [ ] Next-run advice is useful if implemented.

## Playtest Questions

1. Did I feel like I was descending?
2. Did speed tempt me?
3. Did restraint matter?
4. Did curves/switchbacks feel readable?
5. Did steep downhill feel risky without feeling unfair?
6. Did the short uphill make heat/hydration matter?
7. Did river/log crossing choice matter?
8. Did heat feel dangerous?
9. Did hydration matter?
10. Did quad damage make sense?
11. Did crew and second aid choices matter?
12. Did I want to replay?
13. What was confusing?
14. What is the next smallest fix?

## Playtest Note Template

```md
# Playtest - YYYY-MM-DD

## Build / Branch

## What Changed

## Run 1

- Result:
- Time:
- Failure cause:
- Notes:

## Run 2

- Result:
- Time:
- Failure cause:
- Notes:

## Run 3

- Result:
- Time:
- Failure cause:
- Notes:

## What Felt Good

## What Felt Bad

## Confusing

## Bugs

## Next Smallest Fix
```
