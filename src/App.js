import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './App.module.css';
import Dashboard from './Components/Dashboard/Dashboard';

const App = () => {
  return (
    <div className={styles.App}>
      <ToastContainer />
      <Dashboard />
    </div>
  );
};

export default App;
