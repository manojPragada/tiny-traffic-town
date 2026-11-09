import test from 'node:test';
import assert from 'node:assert/strict';
import {geometryEditGate} from '../src/model.js';

test('geometry edit gate only opens for locally aligned preview calibration',()=>{
  assert.deepEqual(geometryEditGate({residual:5}),{ready:true,label:'preview fit ready'});
  assert.deepEqual(geometryEditGate({residual:-6}),{ready:false,label:'reconcile preview fit'});
  assert.deepEqual(geometryEditGate(null),{ready:false,label:'preview calibration unavailable'});
});
