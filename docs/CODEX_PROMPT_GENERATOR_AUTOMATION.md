# Codex Prompt Generator Automation

Copy this prompt into a Codex app automation when you want exactly one new queue prompt generated and committed to `main`.

```txt
You are working in the suc-the-long-burn repo at:

C:\dev\suc-tlb-goblin-2

Generate exactly one new implementation prompt for the STLB self-building game experiment.

Hard rules:
- Do not implement game features.
- Do not edit src/.
- Do not consume a pending prompt.
- Do not move prompts to completed or blocked.
- Do not run npm run goblin:main.
- Do not run npm run agent:one.
- Do not run an interactive browser session.
- Do not edit BC-OS or any external repo.

Use Game Studio guidance if available for a lightweight direction review. Keep the prompt focused on one small improvement for the next playtest: moment-to-moment downhill feel, terrain readability, curves/switchbacks/steeps/uphill, river/log crossing readability, water slowdown/cooling, player/camera readability, cleaner PS1 runner animation, PS1 atmosphere, HUD clarity, heat/hydration/quad decision-making, braking/pacing tension, ice/crew/second-aid survival loop, feedback/juice/responsiveness, or finish/report clarity.

Steps:
1. Change to C:\dev\suc-tlb-goblin-2.
2. Run git status --porcelain=v1 and stop if there are unrelated dirty changes.
3. Run npm run prompt:generate.
4. Confirm exactly one new file was written under prompts/pending/ as NNN-short-title.md.
5. Confirm a queue-generation report was written under reports/runs/.
6. Run npm run agent:check.
7. If validation passes, commit directly to main with a message like:
   Generate STLB prompt NNN: short-title
8. Do not push unless Brandon explicitly asks.

The generator must analyze:
- GAME.md
- ROADMAP.md
- docs/BACKLOG.md
- docs/MECHANICS_SPEC.md
- docs/PS1_3D_STYLE_GUIDE.md
- docs/LEVEL_DESIGN_GUIDE.md
- docs/CAL_STREET_HEAT_DROP.md
- docs/PROMPT_PIPELINE.md
- recent reports/runs/
- recent reports/playtests/
- screenshots in reports/playtests/screenshots/, reports/screenshots/, and .goblin/screenshots/ if present
- current source files in src/
- current prompt ledger state

Do not generate prompts for open world, exact Western States recreation, real maps/GPX, external APIs, multiplayer, accounts, many aid stations, complex water physics, advanced log balance physics, high-poly assets, or complex animation rigs.

The new prompt must use the exact structure documented in docs/PROMPT_GENERATION.md and must validate with:

npm run agent:check

Final response:
- name the generated prompt file
- name the report file
- summarize why the prompt was generated
- report the validation result
- mention whether a commit was created
```
