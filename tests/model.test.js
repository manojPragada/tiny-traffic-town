import {test} from 'node:test';import assert from 'node:assert/strict';import {congestionLevel,initialState,spawn,step,waitingCount,requestSignal,roadTopology,routeForLane,routeSummary,validateRoadTopology} from '../src/model.js';
test('red signal stops approaching car at line',()=>{let s={...initialState(),cars:[{id:1,lane:'south',position:179}]};s=step(s,.1);assert.equal(s.cars[0].position,180);assert.equal(waitingCount(s),1);});
test('green permits crossing and exits increment completed',()=>{const s={...initialState(),cars:[{id:1,lane:'east',position:829}]};const next=step(s,.1);assert.equal(next.cars.length,0);assert.equal(next.completed,1);});
test('spawn preserves entry spacing',()=>{const s=spawn(spawn(initialState()));assert.equal(spawn(s),s);});
test('following cars preserve spacing',()=>{const s={...initialState(),cars:[{id:1,lane:'east',position:100},{id:2,lane:'east',position:65}]};const next=step(s,.1);assert.ok(next.cars[0].position-next.cars[1].position>=32);});
test('large elapsed time is bounded',()=>{const s=step(initialState(),100);assert.ok(s.cars.every(c=>c.position<=126));});
test('road topology has valid directed routes for both lanes',()=>{assert.equal(validateRoadTopology(),true);assert.deepEqual(routeForLane('east').map(edge=>edge.id),['east-approach','east-departure']);assert.deepEqual(routeForLane('south').map(edge=>edge.id),['south-approach','south-departure']);assert.equal(routeForLane('missing').length,0);assert.equal(roadTopology.nodes.length,5);});
test('road topology validation rejects dangling and zero-length edges',()=>{assert.equal(validateRoadTopology({nodes:[{id:'a'}],edges:[{from:'a',to:'b',length:2}]}),false);assert.equal(validateRoadTopology({nodes:[{id:'a'},{id:'b'}],edges:[{from:'a',to:'b',length:0}]}),false);});
test('route summaries expose ordered nodes, edges and total length',()=>{assert.deepEqual(routeSummary('east'),{lane:'east',edgeIds:['east-approach','east-departure'],nodeIds:['west-entry','junction','east-exit'],length:800});assert.equal(routeSummary('missing'),null);});


test('signal request enters all-red phase before switching',()=>{const initial=initialState();const requested=requestSignal(initial,'south');assert.equal(requested.green,null);assert.equal(requested.targetGreen,'south');assert.equal(requested.clearanceLeft,2);assert.equal(initial.green,'east');});
test('committed traffic clears before the next green',()=>{let state={...initialState(),cars:[{id:1,lane:'east',position:331},{id:2,lane:'south',position:179}]};state=requestSignal(state,'south');for(let i=0;i<20;i++)state=step(state,.1);assert.equal(state.green,null);assert.equal(state.cars.find(car=>car.id===2).position,180);state=step(state,.1);assert.equal(state.green,'south');});
test('waiting metric includes queued followers but not approaching cars',()=>{const state={...initialState(),cars:[{id:1,lane:'south',position:180},{id:2,lane:'south',position:148},{id:3,lane:'south',position:80}]};assert.equal(waitingCount(state),2);});
test('invalid elapsed time cannot corrupt vehicle positions',()=>{const state=step(initialState(),NaN);assert.ok(state.cars.every(car=>Number.isFinite(car.position)));assert.equal(requestSignal(state,'invalid'),state);});
test('congestion labels expose the share of active cars queued',()=>{
 assert.deepEqual(congestionLevel({...initialState(),cars:[]}),{label:'CLEAR',ratio:0,waiting:0,active:0});
 const building={...initialState(),cars:[{id:1,lane:'south',position:180},{id:2,lane:'east',position:100},{id:3,lane:'east',position:50},{id:4,lane:'east',position:0}]};
 assert.deepEqual(congestionLevel(building),{label:'BUILDING',ratio:.25,waiting:1,active:4});
 const heavy={...initialState(),cars:[{id:1,lane:'south',position:180},{id:2,lane:'south',position:148},{id:3,lane:'east',position:10}]};
 assert.equal(congestionLevel(heavy).label,'HEAVY');
});


