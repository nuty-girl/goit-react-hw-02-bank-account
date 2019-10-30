import React, { Component } from 'react';
import T from 'prop-types';
import styles from './Controls.module.css';

export default class Controls extends Component {
  static propTypes = {
    onDeposit: T.func.isRequired,
    onWithdraw: T.func.isRequired,
  };

  static defaultProps = {};

  state = {
    inputValue: '',
  };

  getInputValue = e => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  reset = () => {
    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { onDeposit, onWithdraw } = this.props;
    const { inputValue } = this.state;
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="amount"
          value={this.inputValue}
          onChange={this.getInputValue}
        />
        <button type="button" onClick={() => onDeposit(inputValue)}>
          Deposit
        </button>
        <button type="button" onClick={() => onWithdraw(inputValue)}>
          Withdraw
        </button>
      </section>
    );
  }
}
