# Playtest Checklist

Use this after every meaningful change.

## Startup

- [ ] App starts.
- [ ] Mission loads.
- [ ] No obvious console errors.
- [ ] Restart works.

## 3D / Camera

- [ ] Runner is visible.
- [ ] Camera follows correctly.
- [ ] Trail ahead is readable.
- [ ] Downhill direction is obvious.
- [ ] Fog/draw distance does not confuse navigation.

## Controls

- [ ] Left/right steering works.
- [ ] Brake/control works.
- [ ] Pace controls work.
- [ ] Cooling control works if implemented.
- [ ] Crew interaction works if implemented.
- [ ] Controls feel stable.

## Downhill Feel

- [ ] Speed feels tempting.
- [ ] Braking feels useful.
- [ ] Turns are readable.
- [ ] Fast lines and safe lines are understandable.
- [ ] Reckless descending has consequences.

## Resources

- [ ] Heat rises.
- [ ] Hydration drains.
- [ ] Quad damage accumulates.
- [ ] Cooling helps.
- [ ] Low hydration makes heat worse.
- [ ] High quad damage affects the finish.

## Crew

- [ ] Crew start is visible.
- [ ] Crew choices are understandable.
- [ ] Choices affect the run.
- [ ] Leaving fast is risky.
- [ ] Crew feels SUC, not generic.

## Visual Style

- [ ] PS1 low-poly vibe is present.
- [ ] Environment feels hot/dry.
- [ ] HUD is readable.
- [ ] Warning states are clear.
- [ ] The style does not look like a modern generic runner.

## Mission

- [ ] Start is clear.
- [ ] Finish is clear.
- [ ] Mission lasts roughly 3–7 minutes when tuned.
- [ ] Player can finish.
- [ ] Player can fail.
- [ ] Replay is immediate.

## Run Report

- [ ] Report shows result.
- [ ] Time is shown.
- [ ] Max heat is shown.
- [ ] Lowest hydration is shown.
- [ ] Quad damage is shown.
- [ ] Failure cause is shown if failed.
- [ ] Verdict fits the tone.

## Playtest Questions

1. Did I feel like I was descending?
2. Did speed tempt me?
3. Did restraint matter?
4. Did heat feel dangerous?
5. Did hydration matter?
6. Did quad damage make sense?
7. Did crew choices matter?
8. Did I want to replay?
9. What was confusing?
10. What is the next smallest fix?

## Playtest Note Template

```md
# Playtest — YYYY-MM-DD

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
