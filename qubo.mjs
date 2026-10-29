export const example = Object.freeze({
  matrix: Object.freeze([
    Object.freeze([-6, 2, 0, 1]),
    Object.freeze([2, -4, 1, 0]),
    Object.freeze([0, 1, -5, 2]),
    Object.freeze([1, 0, 2, -3]),
  ]),
  solution: Object.freeze([1, 0, 1, 0]),
  reportedScore: -11,
});

// Full-matrix convention: sum every Q[i][j] * x[i] * x[j].
// Symmetric off-diagonal entries therefore contribute twice.
export function objective(matrix, solution) {
  if (!Array.isArray(matrix) || !Array.isArray(solution) || matrix.length !== solution.length || !solution.length) {
    throw new TypeError('The matrix and solution must have matching, nonzero dimensions.');
  }
  if (!solution.every(value => value === 0 || value === 1)) throw new TypeError('The solution must contain binary values.');
  let result = 0;
  for (let row = 0; row < solution.length; row++) {
    if (!Array.isArray(matrix[row]) || matrix[row].length !== solution.length) throw new TypeError('The matrix must be square.');
    for (let col = 0; col < solution.length; col++) {
      if (!Number.isSafeInteger(matrix[row][col])) throw new TypeError('This demonstration requires safe integer coefficients.');
      const term = matrix[row][col] * solution[row] * solution[col];
      if (!Number.isSafeInteger(result + term)) throw new RangeError('The score exceeds safe integer precision.');
      result += term;
    }
  }
  return result;
}

export function makeReport(solution) {
  const calculatedScore = objective(example.matrix, solution);
  return {
    schemaVersion: 1,
    project: 'WorkLens',
    dataSource: 'synthetic-example',
    chainData: false,
    objectiveConvention: 'x^T Q x; full matrix, including both symmetric off-diagonal entries',
    matrix: example.matrix,
    solution: [...solution],
    reportedScore: example.reportedScore,
    calculatedScore,
    scoreMatches: calculatedScore === example.reportedScore,
    globalOptimalityProven: false,
    consensusValidated: false,
  };
}
