import React from 'react';
import T from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={styles.balance}>
    <span>{income}$</span>
    <span>{expenses}$</span>
    <span>Balance:{balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: T.number.isRequired,
  income: T.number,
  expenses: T.number,
};
Balance.defaultProps = {
  income: 0,
  expenses: 0,
};
export default Balance;
