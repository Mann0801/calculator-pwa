import './style.css';

const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', 'C', '=', '+',
];

document.querySelector('#app').innerHTML = `
  <div class="calculator-container">
    <h1>Calculator</h1>
    <div class="calculator">
      <input id="display" class="calculator-display" type="text" value="" readonly />
      <div class="calculator-buttons">
        ${buttons.map(b => `<button class="calc-btn" data-value="${b}">${b}</button>`).join('')}
      </div>
    </div>
  </div>
`;

const display = document.getElementById('display');
let current = '';
let resetNext = false;

document.querySelectorAll('.calc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.getAttribute('data-value');
    if (value === 'C') {
      current = '';
      display.value = '';
    } else if (value === '=') {
      try {
        current = eval(current.replace(/[^-+*/.\d]/g, '')) + '';
        display.value = current;
        resetNext = true;
      } catch {
        display.value = 'Error';
        current = '';
        resetNext = true;
      }
    } else {
      if (resetNext) {
        current = '';
        resetNext = false;
      }
      current += value;
      display.value = current;
    }
  });
});
