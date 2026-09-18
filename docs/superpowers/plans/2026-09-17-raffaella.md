# Raffaella implementation plan

> **For agentic workers:** Execute inline with executing-plans, task by task.

**Goal:** Deliver the approved invitation replica with automatic music attempts and accessible fallback.
**Architecture:** One presentation route, isolated music controller and countdown utility. Use the existing YouTube song and original visual resources.
**Tech Stack:** Sites scaffold, React, CSS, Node test runner.
**Spec:** ../specs/2026-09-17-raffaella-design.md

## Global constraints

- Event: 2026-09-26T15:00:00-05:00.
- Keep original Maps, RSVP and gifts links.
- Attempt audible autoplay, retry during real cover interaction, respect manual pause.
- Keep decorative videos muted. No invented itinerary times.

## Task 1: invitation

- [x] Scaffold `web` with Sites and shadcn; install dependencies.
- [x] Acquire original imagery and verify itinerary from visible reference.
- [x] Replace primary route and stylesheet with pink western invitation; original imagery, event cards, navigation and RSVP.
- [x] Start development server and hand off meaningful preview.

## Task 2: audio and countdown

- [x] Write `web/tests/invitation.test.mjs` first. Assert autoplay is requested on ready, state remains pending until playing event, blocked playback can retry, cover cannot restart manual pause, early cover interaction does not pretend playback succeeded, countdown clamps to zero.
- [x] Run `node --test tests/invitation.test.mjs` and observe missing behavior.
- [x] Implement `web/lib/music-controller.mjs` and `web/lib/countdown.mjs`, integrate controller into `web/components/music.tsx` and countdown into route.
- [x] Run tests and production build. Inspect failures and repair before publication.

## Task 3: private publication

- [x] Register a single Site, persist exact project identifier, commit and push validated source using transient authentication.
- [x] Package public output using Sites helper; save version and deploy privately.
- [x] Confirm terminal deployment success and return URL.
