# Roadmap
## Completed
- [x] Build a working four-way junction simulation
- [x] Add timed traffic lights with manual phase advance
- [x] Add controllable demand, pause/reset and congestion metrics
- [x] Add reduced-motion default pause and responsive controls
- [x] Add a constrained road-drawing prototype with connection validation
- [x] Add per-approach queue length bars
## Next
- [ ] Add deterministic turn routing and collision reservations
- [ ] Add save/load for local town layouts
## Continuity
2026-11-10: Added pure per-approach queue aggregation with deterministic tests and a responsive, reduced-motion-aware pressure board. It counts only vehicles actually stopped by a red signal. Next: connect validated layouts to deterministic turn routing and collision reservations.

2026-11-09: Added an accessible 5×5 road workshop that permits only adjacent construction and rejects edits that disconnect the network. It remains intentionally separate from vehicle routing. Next: connect validated layouts to deterministic turn routing and collision reservations.

2026-11-09: Established the first playable junction with four approaches, timed green/yellow phases, queuing vehicles, demand control and throughput/wait metrics. The engine is separated from canvas rendering and tested for signal safety, waiting and completion.
