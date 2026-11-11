import './queueBoard.css'
import { queueLengths, type Approach, type State } from './engine'

const approaches: Approach[] = ['north', 'east', 'south', 'west']

export function mountQueueBoard() {
  const metrics = document.querySelector('.metrics')
  if (!metrics || document.querySelector('.queue-board')) return
  const board = document.createElement('section')
  board.className = 'queue-board'
  board.setAttribute('aria-label', 'Waiting vehicles by approach')
  board.innerHTML = `<div><p>QUEUE PRESSURE</p><h2>Who is waiting?</h2><small>Bars count vehicles stopped at a red signal, not every car on an approach.</small></div><div class="queue-bars">${approaches.map(approach => `<article><span>${approach.toUpperCase()}</span><b id="queue-${approach}">0</b><div><i id="queue-bar-${approach}"></i></div></article>`).join('')}</div>`
  metrics.after(board)
}

export function updateQueueBoard(state: State) {
  const queues = queueLengths(state)
  for (const approach of approaches) {
    const count = document.querySelector<HTMLElement>(`#queue-${approach}`)
    const bar = document.querySelector<HTMLElement>(`#queue-bar-${approach}`)
    if (count) count.textContent = String(queues[approach])
    if (bar) bar.style.width = `${Math.min(100, queues[approach] / 8 * 100)}%`
  }
}
