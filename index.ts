import { Interpreter } from './src';

const button = document.querySelector('button');
const varName = document.querySelector('#var-name') as HTMLInputElement;
const varValue = document.querySelector('#var-val') as HTMLInputElement;
const expInput = document.querySelector('#exp') as HTMLInputElement;
const p = document.querySelector('p');

const dictionary = {
  // "now": "agora",
  // "and": "e",
  // "equals": "igual",
  // "greaterThan": "maiorque",
  // "greaterThanEquals": "maiorigualque",
  // "if": "se",
  // "lesserThan": "menorque",
  // "lesserThanEquals": "menorigualque",
  // "or": "ou",
  // "division": "div",
  // "module": "mod",
  // "multiplication": "mult",
  // "round": "arred",
  // "subtraction": "sub",
  // "sum": "soma"
};

button.onclick = () => {
  if (!expInput?.value) return;

  try {
    const exp = new Interpreter({ [varName?.value]: varValue?.value }, dictionary);
    const result = exp.interpret(expInput.value);
    if (p) p.innerText = `Result: ${result}`;
  } catch (err) {
    console.log(err);
    alert('#ERROR');
  }
};