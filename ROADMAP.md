# Roadmap

## Completed

- [x] Working static prototype and separated model/UI files
- [x] Behavioral tests and verified setup commands
- [x] Responsive styles, visible focus and reduced-motion support
- [x] Queue-share congestion indicator with tested thresholds

## Next

- [x] Define and validate explicit node/edge topology for the existing junction
- [ ] Add road editing on top of the explicit topology (length and node-preview editors complete)
- [ ] Add car routing and collision-aware intersection occupancy
- [ ] Add timed signal cycles and historical congestion charts

## Continuity

2026-10-30: Rendered the tested route-level model length, preview length and signed drift in the route inspector, updating immediately after graph edits. Next: establish a shared geometry scale before wiring edits into lane paths.

2026-10-29: Added a tested route-level model-versus-preview length and drift model for the route inspector. Next: render it in the UI, then establish a shared geometry scale before wiring edits into lane paths.

2026-10-28: Added an explicit action that reconciles model segment lengths to rounded preview geometry while keeping vehicle physics limitations visible. Next: establish a shared geometry scale before wiring edits into lane paths.

2026-10-27: Added a visible aligned/model-longer/preview-longer state using a 10% tolerance, making geometry drift immediately legible. Next: establish one geometry scale before connecting edits to lane physics.

2026-10-26: Added an explicit preview-pixel-to-model-unit comparison so geometry and route-metric edits can be reconciled instead of silently drifting. Next: establish one geometry scale before connecting edits to lane physics.

2026-10-25: Added measured SVG preview geometry totals and per-segment lengths, making the difference between edited coordinates and fixed vehicle physics inspectable. Next: reconcile preview geometry with lane paths before calling this a road drawer.

2026-10-24: Added bounded node-coordinate editing with a connected SVG geometry preview. It deliberately leaves the static road art and vehicle/collision physics unchanged and says so in the interface. Next: reconcile editable geometry with lane paths before calling this a road drawer.

2026-10-23: Added the first constrained graph edit: a validated, session-only segment-length change with graph/town reset and an explicit warning that SVG geometry and physics remain fixed. Next: coordinate editing with collision-free geometry preview before this can become a true road drawer.

2026-10-22: Added a route inspector that exposes ordered graph nodes, total model length and the vehicles assigned to each lane. This is read-only groundwork for a constrained editor; topology and road geometry remain immutable. Next: safely edit one segment property without breaking route validation or simulation reset.

2026-10-22: Introduced an immutable five-node/four-edge directed road graph, deterministic per-lane routes, topology validation, and a visible graph summary. Vehicles now expose their route edge IDs for inspection. Next: build a constrained editor on this foundation before expanding routing.

2026-10-20: Added a live, accessible congestion badge derived from the existing queue model. It labels the queued share of active cars as clear, flowing, building or heavy; this remains explicitly simplified demo telemetry. Ten model tests, syntax checks and all three browser scenarios passed locally. Next: design explicit node/edge road topology before adding an editor.

2026-10-20: Added repeatable Playwright regression checks and a public-repository-only CI workflow. Desktop, mobile and motion-enabled scenarios passed locally using Chromium 153; model tests and syntax checks passed. Screenshots generated locally for inspection. Earlier browser-unavailable notes below are historical. No deployment or live-provider validation performed. Next: expand browser coverage and review the existing PR before merging.

Initial prototype created 2026-10-17. Re-read repository contents and latest commits before continuing. No hosted deployment. No live data integrations.

## Verification

- 5 model tests passed with Node.js 24.
- JavaScript syntax checks passed.
- Local HTTP document/module/style serving and HTML anchor/ID integrity checked.
- Browser rendering and interaction QA **not completed**: no installed Chromium; browser download failed. No screenshot is claimed.
- Implementation is proposed on `feat/initial-experience` for review; inspect open PRs before starting the next change. Prioritize desktop/mobile and keyboard browser review next.


2026-10-18: Added all-red signal transitions with committed-vehicle clearance, fuller waiting counts, manual single-step mode, invalid-delta handling and hidden-tab/live reduced-motion pausing. Nine model tests pass. Full collision physics, road editing and browser review remain pending.


