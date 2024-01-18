// BankSimulator.jsx
import React from 'react';
import './BankSimulatorHome.css'
import BankSimulator from '../components/bank_simulator/BankSimulator'

function BankSimulatorHome() {
  return (
    <div className="bank-simulator">
      <h1>Welcome to Bank Simulator</h1>
      <BankSimulator />
 
    </div>
  );
}

export default BankSimulatorHome;


