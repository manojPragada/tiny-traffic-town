import {test} from 'node:test';import assert from 'node:assert/strict';import {geometryScaleSummary,roadTopology} from '../src/model.js';
test('geometry scale compares preview pixels with model units',()=>{const summary=geometryScaleSummary(roadTopology);assert.ok(summary.preview>0);assert.ok(summary.model>0);assert.equal(summary.ratio,summary.preview/summary.model);});
