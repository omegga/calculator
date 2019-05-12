export function isNumber(x) {
  return /^[0-9]+$/.test(x);
}

export function isDecimal(x) {
  return !isNaN(x) && x.includes('.');
}

export function isOperator(x) {
  return /[+,\-,x,/]/.test(x);
}

export function resolve(inputs, operator) {
  inputs = [...inputs];
  for (let i = 0; i < inputs.length; i++) {
    if (!operator.test(inputs[i])) {
      continue;
    }
    const ope = inputs[i];
    const a = +inputs[i - 1];
    const b = +inputs[i + 1];
    let c;
    if (ope === 'x') {
      c = a * b;
    }
    if (ope === '/') {
      c = a / b;
    }
    if (ope === '+') {
      c = a + b;
    }
    if (ope === '-') {
      c = a - b;
    }
    inputs.splice(i - 1, 3, c);
    i = i - 1;
  }
  return inputs;
}

export function computeResult(inputsList) {
  inputsList = resolve(inputsList, /[x,/]/);
  inputsList = resolve(inputsList, /[+,-]/);
  return inputsList;
}
