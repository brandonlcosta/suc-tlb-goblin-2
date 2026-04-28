# Decisions Log

This file records important product/design decisions so the repo does not forget why things are shaped this way.

## 001 — Mission-Based, Not Open World

Decision:
`SUC: The Long Burn` will be mission-based.

Reason:
The game needs to be playable early and AI-buildable in small chunks. An open world would explode scope.

Implication:
Each mission is a contained trail corridor with a start, finish, route intel, resource pressure, and report.

## 002 — Foresthill Heat Drop Is the First Mission

Decision:
The first mission is `Foresthill Heat Drop`.

Reason:
It captures the core fantasy immediately: iconic trail, heat, descent, crew, and survival.

Implication:
All early systems should support this mission before adding any others.

## 003 — Retro Pixel Style

Decision:
Use retro/pixelated visuals.

Reason:
This fits SUC grit, keeps asset needs low, and helps avoid realism scope creep.

Implication:
Readable low-res visuals beat realism.

## 004 — Heat Is the Main Boss

Decision:
Heat is the primary threat system.

Reason:
It is specific, personal, tactical, and different from most running games.

Implication:
Every major mechanic should interact with heat, cooling, hydration, or pacing.

## 005 — Crew Is Tactical, Not a Full Management Sim

Decision:
Crew stops are quick triage moments.

Reason:
Crew is essential to the ultra fantasy, but a full management sim is too much for V1.

Implication:
Crew actions should be fast, limited, and clear.

## 006 — No External APIs

Decision:
No external APIs in V1.

Reason:
The game should be stable, offline-friendly, and simple for autonomous implementation.

Implication:
No Strava, no real maps, no online leaderboards, no accounts.

## 007 — BC-OS Is the Operator, Not the Game

Decision:
BC-OS writes prompts, reads reports, and helps plan. It does not become part of the game runtime.

Reason:
Keep the game repo clean and separate.

Implication:
Game automation must not edit BC-OS.
