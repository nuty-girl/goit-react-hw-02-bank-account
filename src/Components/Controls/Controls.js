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
    const amount = Number(e.currentTarget.value);
    this.setState({
      inputValue: amount,
    });
  };

  handleDeposit = () => {
    this.props.onDeposit(this.state.inputValue);
    this.reset();
  };

  handleWithdraw = () => {
    this.props.onWithdraw(this.state.inputValue);
    this.reset();
  };

  reset = () => {
    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="amount"
          value={inputValue}
          onChange={this.getInputValue}
        />
        <button type="button" onClick={this.handleDeposit}>
          Deposit
        </button>
        <button type="button" onClick={this.handleWithdraw}>
          Withdraw
        </button>
      </section>
    );
  }
}
