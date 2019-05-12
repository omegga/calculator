import React, { Component } from 'react';
import { isNumber, isDecimal, isOperator, computeResult } from '../helpers';
import buttons from '../buttons';

class Calculator extends Component {
  state = {
    inputsList: [],
    temp: '',
    result: ''
  };

  onButtonPress = e => {
    const { lastTyped } = e.target.dataset;
    let list = [...this.state.inputsList];
    let { temp } = this.state;

    if (this.state.result && isOperator(lastTyped)) {
      list.push(this.state.result);
      temp = lastTyped;
      this.setState({ inputsList: list, temp, result: '' });
      return;
    }

    if (this.state.result && isNumber(lastTyped)) {
      temp = lastTyped;
      this.setState({ inputsList: [], temp, result: '' });
      return;
    }

    if (this.state.result && lastTyped === '.') {
      temp = `0.`;
      this.setState({ inputsList: [], temp, result: '' });
      return;
    }

    if (this.state.result && lastTyped === '=') {
      this.setState({ inputsList: [], temp: '' });
      return;
    }

    if (temp.length === 0 && isNumber(lastTyped)) {
      this.setState({ temp: lastTyped });
      return;
    }

    if (temp.length === 1 && temp[0] == '0' && lastTyped == '0') {
      this.setState({ temp: '0' });
      return;
    }

    if (temp == '0' && isNumber(lastTyped) && lastTyped != '0') {
      this.setState({ temp: lastTyped });
      return;
    }

    if (isNumber(temp) && isNumber(lastTyped)) {
      temp += lastTyped;
      this.setState({ temp });
      return;
    }

    if (isNumber(temp) && lastTyped === '.') {
      temp += lastTyped;
      this.setState({ temp });
      return;
    }

    if (/[0-9]+\.$/.test(temp) && isNumber(lastTyped)) {
      temp += lastTyped;
      this.setState({ temp });
      return;
    }

    if (isDecimal(temp) && isNumber(lastTyped)) {
      temp += lastTyped;
      this.setState({ temp });
      return;
    }

    if ((isNumber(temp) || isDecimal(temp)) && isOperator(lastTyped)) {
      list.push(temp);
      temp = lastTyped;
      this.setState({ inputsList: list, temp });
      return;
    }

    if (isOperator(temp) && isNumber(lastTyped)) {
      list.push(temp);
      temp = lastTyped;
      this.setState({ inputsList: list, temp });
      return;
    }

    if (isOperator(temp) && isOperator(lastTyped)) {
      temp = lastTyped;
      this.setState({ temp });
      return;
    }

    if (lastTyped === 'AC') {
      this.setState({ inputsList: [], temp: '0', result: '' });
      return;
    }

    if ((isNumber(temp) || isDecimal(temp)) && lastTyped === '=') {
      list.push(temp);
      temp = '';
      let [result] = computeResult(list);
      this.setState({ inputsList: [], result });
      return;
    }
  };

  render() {
    return (
      <section id="calculator">
        <input
          type="text"
          id="display"
          disabled
          value={
            this.state.result
              ? this.state.result
              : this.state.inputsList.join('') + this.state.temp
          }
        />
        {buttons.map(button => {
          return (
            <button
              key={button.name}
              id={button.name}
              className="calculator-button"
              data-last-typed={button.output}
              onClick={this.onButtonPress}
            >
              {button.output}
            </button>
          );
        })}
      </section>
    );
  }
}

export default Calculator;
