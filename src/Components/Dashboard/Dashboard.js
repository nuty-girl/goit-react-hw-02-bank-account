import React, { Component } from 'react';
import T from 'prop-types';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

export default class Dashboard extends Component {
  static propTypes = {
    initialTransactions: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        type: T.string.isRequired,
        amount: T.number.isRequired,
        date: T.string.isRequired,
      }).isRequired,
    ),
  };

  static defaultProps = {
    initialTransactions: [],
  };

  state = {
    transactions: this.props.initialTransactions,
    balance: 0,
  };

  notifyErrorAmount = () => toast('Введите сумму для проведения операции!');

  notifyErrorFunds = () =>
    toast('На счету недостаточно средств для проведения операции!');

  countFunds = () => {
    return this.state.transactions.reduce(
      (acc, transaction) => {
        return {
          ...acc,
          [transaction.type]: acc[transaction.type] + transaction.amount,
        };
      },
      { deposit: 0, withdraw: 0 },
    );
  };

  hendlerDeposit = amount => {
    const transaction = {
      id: shortid.generate(),
      type: 'deposit',
      amount: Number(amount),
      date: new Date().toLocaleString(),
    };
    if (amount === 0 || '') {
      this.notifyErrorAmount();
    } else if (amount > 0) {
      this.setState(state => ({
        transactions: [...state.transactions, transaction],
      }));

      this.setState(prevState => ({
        balance: Number(prevState.balance) + Number(amount),
      }));
    }
  };

  hendlerWithdraw = amount => {
    const transaction = {
      id: shortid.generate(),
      type: 'withdraw',
      amount: Number(amount),
      date: new Date().toLocaleString(),
    };
    if (amount > this.state.balance) {
      this.notifyErrorFunds();
    } else if (amount === 0 || '') {
      this.notifyErrorAmount();
    } else if (amount > 0 && amount <= this.state.balance) {
      this.setState(prevState => ({
        balance: prevState.balance - amount,
      }));
      this.setState(state => ({
        transactions: [...state.transactions, transaction],
      }));
    }
  };

  render() {
    const { transactions, balance } = this.state;
    const funds = this.countFunds();

    return (
      <div className={styles.dashboard}>
        <Controls
          onDeposit={this.hendlerDeposit}
          onWithdraw={this.hendlerWithdraw}
        />
        <Balance
          balance={balance}
          income={funds.deposit}
          expenses={funds.withdraw}
        />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}
