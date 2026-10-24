import {congestionLevel,initialState,spawn,step,waitingCount,requestSignal,roadTopology,routeForLane,routeSummary,withEdgeLength} from './model.js';const $=s=>document.querySelector(s);let state=initialState(),topology=roadTopology,playing=false,last=0;
const routeLabel=document.createElement('label');routeLabel.className='route-inspector';routeLabel.textContent='Inspect route ';routeLabel.innerHTML+='<select id="route-focus"><option value="east">Eastbound</option><option value="south">Southbound</option></select><output id="route-summary" class="small muted"></output>';$('#network').after(routeLabel);
const editor=document.createElement('form');editor.id='edge-editor';editor.className='route-inspector';editor.innerHTML='<label>Segment <select id="edge-id"></select></label><label>Model length <input id="edge-length" type="number" min="10" max="2000" step="10" required></label><button type="submit">Apply length</button><button id="reset-graph" type="button">Reset graph</button><p class="small muted">Changes route metrics only; drawn road and vehicle physics stay fixed.</p>';routeLabel.after(editor);
for(const edge of roadTopology.edges){const option=document.createElement('option');option.value=edge.id;option.textContent=edge.id;$('#edge-id').append(option);}
function syncEdgeInput(){const edge=topology.edges.find(edge=>edge.id===$('#edge-id').value);$('#edge-length').value=edge?.length??'';}$('#edge-id').addEventListener('change',syncEdgeInput);syncEdgeInput();
function render(){const ns='http://www.w3.org/2000/svg',focus=$('#route-focus').value;$('#cars').replaceChildren();for(const c of state.cars){const car=document.createElementNS(ns,'rect');car.dataset.route=routeForLane(c.lane,topology).map(edge=>edge.id).join(' ');car.dataset.lane=c.lane;if(c.lane===focus)car.classList.add('route-focus');car.setAttribute('x',c.lane==='east'?c.position-12:409);car.setAttribute('y',c.lane==='east'?263:c.position-12);car.setAttribute('width',c.lane==='east'?24:14);car.setAttribute('height',c.lane==='east'?14:24);car.setAttribute('rx',4);car.setAttribute('fill',['#f8c17f','#a6d9e5','#ed97a8'][c.id%3]);$('#cars').append(car);}$('#east-light').setAttribute('fill',state.green==='east'?'#a4ef8e':'#ff786c');$('#south-light').setAttribute('fill',state.green==='south'?'#a4ef8e':'#ff786c');$('#active').textContent=state.cars.length;$('#waiting').textContent=waitingCount(state);$('#completed').textContent=state.completed;$('#network').textContent=topology.nodes.length+' nodes · '+topology.edges.length+' directed segments';const route=routeSummary(focus,topology);$('#route-summary').textContent=`${route.nodeIds.join(' → ')} · ${route.length} units`;const congestion=congestionLevel(state);$('#congestion').textContent=congestion.label+' · '+Math.round(congestion.ratio*100)+'% queued';$('#congestion').dataset.level=congestion.label.toLowerCase();$('#signal').disabled=state.green===null;$('#signal').textContent=state.green===null?'Clearing intersection…':'Switch to '+(state.green==='east'?'southbound ↓':'eastbound →');$('#signal-state').textContent=state.green===null?'ALL RED · '+state.clearanceLeft.toFixed(1)+'s · WAIT FOR CLEAR':state.green.toUpperCase()+' GREEN';$('#single-step').disabled=playing;}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=null;
function stop(message='Simulation paused.'){
 playing=false;last=0;if(frame!==null)cancelAnimationFrame(frame);frame=null;
 $('#play').textContent='Start simulation';$('#play').setAttribute('aria-pressed','false');$('#status').textContent=message;render();
}
$('#signal').onclick=()=>{state=requestSignal(state,state.green==='east'?'south':'east');$('#status').textContent='All red until the timer expires and committed vehicles clear. Start or step the simulation to advance.';render();};
$('#spawn').onclick=()=>{const next=spawn(state);$('#status').textContent=next===state?'Entry occupied or 20-car limit reached.':'New vehicle added.';state=next;render();};
$('#play').onclick=()=>{
 if(playing)return stop();if(reduced.matches)return;
 playing=true;last=0;$('#play').textContent='Pause simulation';$('#play').setAttribute('aria-pressed','true');$('#status').textContent='Simulation running.';render();frame=requestAnimationFrame(tick);
};
$('#reset').onclick=()=>{state=initialState();topology=roadTopology;syncEdgeInput();stop('Town and graph reset.');};
$('#single-step').onclick=()=>{if(!playing){state=step(state,.1);render();}};
$('#route-focus').addEventListener('change',render);
editor.addEventListener('submit',event=>{event.preventDefault();const next=withEdgeLength(topology,$('#edge-id').value,$('#edge-length').value);if(!next){$('#status').textContent='Length must be between 10 and 2,000 model units.';return;}topology=next;$('#status').textContent='Route metric updated; drawing and vehicle physics are unchanged.';render();});
$('#reset-graph').addEventListener('click',()=>{topology=roadTopology;syncEdgeInput();$('#status').textContent='Road graph metrics reset.';render();});
function tick(time){
 if(!playing)return;
 if(last)state=step(state,(time-last)/1000);last=time;render();frame=requestAnimationFrame(tick);
}
function motionPreference(){if(reduced.matches)stop('Reduced motion enabled. Use Step 0.1s to advance manually.');$('#play').disabled=reduced.matches;}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('Simulation paused while this tab is hidden.');});
reduced.addEventListener('change',motionPreference);render();motionPreference();


