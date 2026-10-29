import { example, objective, makeReport } from './qubo.mjs';

const inputs = [...document.querySelectorAll('.bit input')];
const score = document.querySelector('#score');
const verification = document.querySelector('#verification');
const reset = document.querySelector('#reset');
const download = document.querySelector('#download');
const format = value => String(value).replace('-', '−');
const solution = () => inputs.map(input => Number(input.checked));

function render() {
  const vector = solution();
  const value = objective(example.matrix, vector);
  score.value = format(value);
  inputs.forEach((input, index) => { input.nextElementSibling.textContent = String(vector[index]); });
  document.querySelectorAll('[data-row]').forEach(cell => {
    const row = Number(cell.dataset.row), col = Number(cell.dataset.col);
    cell.classList.toggle('active', Boolean(vector[row] && vector[col]));
    cell.classList.toggle('diagonal', row === col);
  });
  const matches = value === example.reportedScore;
  verification.className = `verification ${matches ? 'match' : 'changed'}`;
  verification.textContent = matches
    ? 'Score matches the recorded example: −11.'
    : `Score differs from the recorded example (−11). Current score: ${format(value)}.`;
}

document.querySelector('#solution-fieldset').disabled = false;
reset.disabled = false;
download.disabled = false;
inputs.forEach(input => input.addEventListener('change', render));
reset.addEventListener('click', () => {
  inputs.forEach((input, index) => { input.checked = Boolean(example.solution[index]); });
  render();
});
download.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(makeReport(solution()), null, 2) + '\n'], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'worklens-example-report.json';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
render();
