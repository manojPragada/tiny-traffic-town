# Tiny Traffic Town
A playful browser traffic laboratory built around a working four-way junction.

**Status:** playable foundation. Vehicles spawn from four approaches, obey exclusive signal phases, queue at red, cross on green and update throughput/wait metrics. Demand, pause, manual phase advance and reset controls work. Road editing and routing are future work; there is no hosted demo.

## Run and verify
Requires Node.js 22+ and npm 11+.
```bash
npm install
npm run dev
npm run check
npm run build
```
`check` runs strict TypeScript and deterministic engine tests. No linter is configured.

## Controls
- Start/pause simulation without resetting state.
- Advance to the next safe phase (`NS green → NS yellow → EW green → EW yellow`).
- Adjust demand from 15–100%; the simulator caps active cars to protect performance.
- Reset vehicles, throughput, delay and phase.

Reduced-motion visitors start paused. The canvas animation never starts audio, accesses location or sends network requests.

## Structure and architecture
```text
src/engine.ts       pure signal, vehicle, queue and metric transitions
src/main.ts         canvas renderer, controls and animation loop
src/styles.css      responsive town/control presentation
src/engine.test.ts  signal safety, queue and completion tests
ROADMAP.md          editor/routing sequence and continuity
```
The simulation uses normalized vehicle progress and a fixed timestep capped at 50 ms. Pure engine functions remain testable without canvas. Rendering uses one responsive 2D canvas while conventional HTML exposes controls and live metrics.

## Configuration and deployment
No environment variables or data sources are required; see `.env.example`. Run `npm run build` and serve `dist/` statically. No external deployment has been performed.

## Accessibility and limitations
Controls are native labeled inputs/buttons, a skip link reaches the control desk, and metrics use an `aria-live` region. The canvas has an accessible label, but vehicles are intentionally summarized through metrics rather than exposed as hundreds of focus targets. This is a playful abstraction, not a traffic-engineering model.

## Troubleshooting and contribution
- No movement: press Start; reduced-motion mode begins paused.
- Long queues: lower demand or manually advance the blocked approach.
- Blurry canvas on a high-density display: current rendering favors predictable low cost; DPR scaling is roadmap work.

All art, simulation logic and copy are original. Keep engine tests deterministic, update the roadmap and run checks before contributing. No license has been selected.
