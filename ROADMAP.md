# Roadmap

## Completed

- [x] Working static prototype and separated model/UI files
- [x] Behavioral tests and verified setup commands
- [x] Responsive styles, visible focus and reduced-motion support
- [x] Queue-share congestion indicator with tested thresholds

## Next

- [ ] Add road editing with explicit node/edge topology
- [ ] Add car routing and collision-aware intersection occupancy
- [ ] Add timed signal cycles and historical congestion charts

## Continuity

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


