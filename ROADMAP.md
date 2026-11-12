# Roadmap
## Completed
- [x] Build a working four-way junction simulation
- [x] Add timed traffic lights with manual phase advance
- [x] Add controllable demand, pause/reset and congestion metrics
- [x] Add reduced-motion default pause and responsive controls
- [x] Add a constrained road-drawing prototype with connection validation
- [x] Add per-approach queue length bars
- [x] Add deterministic route previews to the road workshop
## Next
- [ ] Connect previewed workshop routes to vehicle movement
- [ ] Add collision reservations for routed vehicles
- [ ] Add save/load for local town layouts
## Continuity
2026-11-11: Added deterministic breadth-first route finding between road terminals, a tested route-preview control, visible route highlighting and focus retention after grid edits. The preview is explicitly separate from live vehicle movement. Next: let a bounded vehicle cohort follow the previewed route, then reserve collision zones.

2026-11-10: Added pure per-approach queue aggregation with deterministic tests and a responsive, reduced-motion-aware pressure board. It counts only vehicles actually stopped by a red signal. Next: connect validated layouts to deterministic turn routing and collision reservations.

2026-11-09: Added an accessible 5×5 road workshop that permits only adjacent construction and rejects edits that disconnect the network. It remains intentionally separate from vehicle routing. Next: connect validated layouts to deterministic turn routing and collision reservations.

2026-11-09: Established the first playable junction with four approaches, timed green/yellow phases, queuing vehicles, demand control and throughput/wait metrics. The engine is separated from canvas rendering and tested for signal safety, waiting and completion.
