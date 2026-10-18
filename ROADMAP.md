# Roadmap

## Completed

- [x] Working static prototype and separated model/UI files
- [x] Behavioral tests and verified setup commands
- [x] Responsive styles, visible focus and reduced-motion support

## Next

- [ ] Add road editing with explicit node/edge topology
- [ ] Add car routing and collision-aware intersection occupancy
- [ ] Add timed signal cycles and historical congestion charts

## Continuity

Initial prototype created 2026-10-17. Re-read repository contents and latest commits before continuing. No hosted deployment. No live data integrations.

## Verification

- 5 model tests passed with Node.js 24.
- JavaScript syntax checks passed.
- Local HTTP document/module/style serving and HTML anchor/ID integrity checked.
- Browser rendering and interaction QA **not completed**: no installed Chromium; browser download failed. No screenshot is claimed.
- Implementation is proposed on `feat/initial-experience` for review; inspect open PRs before starting the next change. Prioritize desktop/mobile and keyboard browser review next.
