import React, { useState, useEffect } from 'react';
import { get } from '../../services/authService'; // Adjust the path based on your project structure

const MyAccount = () => {
  const [funds, setFunds] = useState(null);
  const [investmentFunds, setInvestmentFunds] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(number);
  }

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const fundsResponse = await get('/bank/funds');
        setFunds(fundsResponse.data.funds);
        const investmentFundsResponse = await get('/bank/investment-funds');
        setInvestmentFunds(investmentFundsResponse.data.investmentFunds);
      } catch (error) {
        console.error('Error fetching funds or investment funds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Account</h1>
      <div className='bank-info'>
        <div>
          <h2>Savings</h2>
          <p>${funds !== null ? formatNumber(funds) : 'Unavailable'}</p>
        </div>
        <div>
          <h2>Investments</h2>
          <p>${investmentFunds !== null ? formatNumber(investmentFunds) : 'Unavailable'}</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
