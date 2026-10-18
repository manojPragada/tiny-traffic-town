import {test} from 'node:test';import assert from 'node:assert/strict';import {initialState,spawn,step,waitingCount} from '../src/model.js';
test('red signal stops approaching car at line',()=>{let s={...initialState(),cars:[{id:1,lane:'south',position:179}]};s=step(s,.1);assert.equal(s.cars[0].position,180);assert.equal(waitingCount(s),1);});
test('green permits crossing and exits increment completed',()=>{const s={...initialState(),cars:[{id:1,lane:'east',position:829}]};const next=step(s,.1);assert.equal(next.cars.length,0);assert.equal(next.completed,1);});
test('spawn preserves entry spacing',()=>{const s=spawn(spawn(initialState()));assert.equal(spawn(s),s);});
test('following cars preserve spacing',()=>{const s={...initialState(),cars:[{id:1,lane:'east',position:100},{id:2,lane:'east',position:65}]};const next=step(s,.1);assert.ok(next.cars[0].position-next.cars[1].position>=32);});
test('large elapsed time is bounded',()=>{const s=step(initialState(),100);assert.ok(s.cars.every(c=>c.position<=126));});
