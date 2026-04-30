# Decisions Log

## 001 - PS1-Style 3D

Decision:
`SUC: The Long Burn` is now a PS1-style low-poly 3D game.

Reason:
The third-person downhill fantasy is stronger than the earlier pixel-loop arcade direction. PS1 style keeps asset scope low while giving the game a serious, weird identity.

Implication:
Use low-poly, fog, simple terrain, and retro HUD. Do not chase modern realism.

## 002 - Cal Street Heat Drop Is the First Mission

Decision:
The first mission is `Cal Street Heat Drop`, inspired by the Cal Street / Foresthill energy of Western States.

Reason:
It captures the strongest player fantasy: leaving crew, descending hard, managing heat, and avoiding late-race damage.

Implication:
All early systems should serve this mission.

## 003 - Mission-Based, Not Open World

Decision:
The game is mission-based.

Reason:
Open world would explode scope and break the autonomous build loop.

Implication:
Build one corridor at a time.

## 004 - Downhill Momentum Is Core

Decision:
Downhill speed and restraint are central mechanics.

Reason:
A serious downhill section needs a tactical cost to speed.

Implication:
Add pace, braking, quad damage, line choice, and heat pressure.

## 005 - Quad Damage Added

Decision:
Quad damage is now a core resource.

Reason:
It makes the downhill specific and serious.

Implication:
Players can go fast early, but bad descending damages the late mission.

## 006 - Crew Starts the Mission

Decision:
The first mission starts at a Foresthill-style crew zone.

Reason:
Crew execution is part of the ultra fantasy and sets up the descent.

Implication:
Crew choices affect the whole run but remain quick and contained.

## 007 - No Exact Course Recreation

Decision:
The game is inspired by Cal Street / Foresthill, not an exact map.

Reason:
Exact recreation adds unnecessary legal, data, and scope complexity.

Implication:
Use fictionalized terrain and names while preserving the feeling.

## 008 - Portrait Mobile Touch-First

Decision:
`SUC: The Long Burn` is designed first as a portrait-mode mobile browser game with touchscreen interaction as the primary input.

Reason:
The downhill survival loop should be immediately playable in the most natural phone context: one vertical screen, thumbs on controls, trail readable above the hands, and quick tactical decisions under pressure.

Implication:
All core screens and mechanics must work in portrait orientation with touch controls. Keyboard, mouse, controller, landscape, and desktop layouts are fallback or later adaptation paths, not primary design drivers.

## 009 - River / Log Crossings Are Mission Identity

Decision:
River crossings and log crossings are part of the first mission identity.

Reason:
They make the Cal Street-inspired canyon section feel specific and create a strong safe/slow versus fast/risky line-choice moment.

Implication:
Water slows the runner and may cool slightly. Logs are faster but require better control. Crossings should feel like canyon terrain, not arcade obstacles or platformer spam.

## 010 - Second Aid Station Added

Decision:
The first mission includes a second aid station / support point before the final survival push.

Reason:
It creates a tactical reset and lets earlier heat, hydration, crossing, and pacing decisions echo into the final third.

Implication:
Second aid choices should be quick and affect hydration, cooling, fuel/support, time, and final survival. It must not become a full management sim.

## 011 - Trail Geometry Includes Curves and Switchbacks

Decision:
The trail should curve naturally and include switchbacks where useful.

Reason:
A straight corridor does not sell a serious downhill canyon section. Curves and switchbacks reward braking, line choice, and forward reading.

Implication:
Turns must be readable and fair in portrait. Switchbacks should increase control pressure without becoming a maze.

## 012 - Terrain Variation Includes Steeper Downhill and One Short Uphill

Decision:
The mission includes steeper downhill sections and one short uphill interruption.

Reason:
Steeper downhill increases speed temptation and quad damage risk. The short uphill disrupts rhythm and makes heat/hydration management matter.

Implication:
Steep sections must be readable before entry. The uphill must stay short and purposeful; this is still a downhill mission.

## 013 - Cleaner Runner Model and Animation Stay PS1

Decision:
The runner should become cleaner and more readable, with simple better animation, while PS1 style remains the visual target.

Reason:
Portrait mobile readability needs a stronger silhouette and more obvious movement states, but the game should not drift into modern realism.

Implication:
Add a cleaner low-poly runner, basic run cycle, downhill lean, braking posture, and optional wobble/stumble later. Do not add high-poly asset requirements or animation-system bloat.

## 014 - Trail-Race Markers Replace Arches

Decision:
The course should use flags, ribbon, stakes, signs, cones, aid markers, and marked finish chutes instead of visible checkpoint arches.

Reason:
Arches make the mission feel like an arcade checkpoint course. Cal Street Heat Drop should feel like a marked trail race in a hot canyon.

Implication:
If gate-like trigger volumes remain useful internally, their visible art should be trail-race markers. Do not build a sponsor-arch or checkpoint-tunnel visual language.

## 015 - Race Actors Are Atmosphere, Not Simulation

Decision:
Other runners, spectators, volunteers, and crew can appear in the first mission as lightweight atmosphere actors.

Reason:
The world should feel like an actual race instead of a solo test corridor, but the game is still about downhill survival and resource pressure.

Implication:
Use sparse low-poly actors, simple poses, and simple movement. Do not add full race AI, pathfinding crowds, multiplayer, named NPC rosters, or collision-heavy pack behavior.

## 016 - Advanced Retro Detail Must Preserve Readability

Decision:
Trail surface detail, water/log visuals, fog, shimmer, dust, and low-res polish are approved only when they improve atmosphere without hurting route readability.

Reason:
The next phase needs a stronger sense of place, but portrait mobile play still depends on seeing turns, hazards, the runner, and touch controls clearly.

Implication:
Prefer chunky low-poly detail, high-contrast markers, readable water/log silhouettes, and lightweight retro effects. Do not chase modern realism, high-resolution asset packs, heavy post-processing, or visual clutter.
