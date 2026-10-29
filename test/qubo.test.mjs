import test from 'node:test';
import assert from 'node:assert/strict';
import { example, objective, makeReport } from '../site/qubo.mjs';

test('the recorded example and zero vector have reproducible scores', () => {
  assert.equal(objective(example.matrix, example.solution), -11);
  assert.equal(objective(example.matrix, [0, 0, 0, 0]), 0);
});
test('the full-matrix convention includes both symmetric cross terms', () => {
  assert.equal(objective([[-2, 3], [3, -4]], [1, 1]), 0);
  assert.equal(objective(example.matrix, [1, 1, 1, 1]), -6);
});
test('every possible example solution agrees with an independently expanded polynomial', () => {
  for (let bits = 0; bits < 16; bits++) {
    const [a,b,c,d] = Array.from({ length: 4 }, (_, index) => (bits >> index) & 1);
    const expanded = -6*a -4*b -5*c -3*d +4*a*b +2*a*d +2*b*c +4*c*d;
    assert.equal(objective(example.matrix, [a,b,c,d]), expanded);
  }
});
test('invalid inputs and unsafe integer calculations are rejected', () => {
  assert.throws(() => objective([[1]], [2]), /binary/);
  assert.throws(() => objective([[1, 2]], [1]), /square/);
  assert.throws(() => objective([[0.1]], [1]), /safe integer/);
  assert.throws(() => objective([[Number.MAX_SAFE_INTEGER, 1], [1, 0]], [1, 1]), /precision/);
});
test('export preserves reproducibility and states the limits of verification', () => {
  const report = makeReport([1, 0, 1, 0]);
  assert.equal(report.calculatedScore, -11);
  assert.equal(report.scoreMatches, true);
  assert.equal(report.chainData, false);
  assert.equal(report.globalOptimalityProven, false);
  assert.equal(report.consensusValidated, false);
  assert.equal(makeReport([0, 0, 0, 0]).scoreMatches, false);
});
