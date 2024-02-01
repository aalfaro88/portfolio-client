import React, { useState, useEffect } from 'react';
import { get, post } from '../../services/authService';
import './MyAccount.css';

const MyAccount = () => {
  const [funds, setFunds] = useState(null);
  const [investmentFunds, setInvestmentFunds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amountToInvest, setAmountToInvest] = useState('');
  const [investmentErrorMessage, setInvestmentErrorMessage] = useState('');
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [withdrawErrorMessage, setWithdrawErrorMessage] = useState('');
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientCardNumber, setRecipientCardNumber] = useState('');
  const [transferErrorMessage, setTransferErrorMessage] = useState('');

  const growthRate = 0.01;

  useEffect(() => {
      const interval = setInterval(() => {
          const now = Date.now();
          const secondsSinceLastUpdate = (now - lastUpdate) / 1000; // Convert milliseconds to seconds
          if (secondsSinceLastUpdate >= 1) {
              setInvestmentFunds(prevFunds => Math.round(prevFunds * Math.pow(1 + growthRate, secondsSinceLastUpdate)));
              setLastUpdate(now);
          }
      }, 10000); // Update every 10 seconds
  
      // Clean up the interval on component unmount
      return () => clearInterval(interval);
  }, [lastUpdate, investmentFunds]);
  

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(number);
  };

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

  const handleInvestmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInvestmentErrorMessage('');
  
    const investmentAmount = Number(amountToInvest);
  
    // Check for invalid investment amounts
    if (investmentAmount <= 0) {
      setInvestmentErrorMessage('Investment amount must be greater than 0.');
      setLoading(false);
      return;
    }
  
    if (investmentAmount > funds) {
      setInvestmentErrorMessage('Investment amount cannot exceed available funds.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await post('/bank/deposit-to-investment', { amount: investmentAmount });
      console.log('Investment successful:', response.data);
      setFunds(response.data.funds); // Update the funds state
      setInvestmentFunds(response.data.investmentFunds); // Update the investment funds state
      setAmountToInvest(''); // Reset the input field
    } catch (error) {
      console.error('Investment Error:', error.response?.data?.message || 'An error occurred.');
      setInvestmentErrorMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWithdrawErrorMessage('');

    const withdrawalAmount = Number(amountToWithdraw);

    // Check for invalid withdrawal amounts
    if (withdrawalAmount <= 0) {
      setWithdrawErrorMessage('Withdrawal amount must be greater than 0.');
      setLoading(false);
      return;
    }

    // Update investment funds in the database to the latest calculated value
    try {
      const updateResponse = await post('/bank/update-investment-funds', { investmentFunds });
      console.log('Investment funds updated:', updateResponse.data);
    } catch (error) {
      console.error('Error updating investment funds:', error.response?.data?.message || 'An error occurred.');
      setWithdrawErrorMessage(error.response?.data?.message || 'An error occurred.');
      setLoading(false);
      return;
    }

    if (withdrawalAmount > investmentFunds) {
      setWithdrawErrorMessage('Withdrawal amount cannot exceed investment funds.');
      setLoading(false);
      return;
    }

    try {
      const response = await post('/bank/withdraw-from-investment', { amount: withdrawalAmount });
      console.log('Withdrawal successful:', response.data);
      setFunds(response.data.funds); // Update the funds state
      setInvestmentFunds(response.data.investmentFunds); // Update the investment funds state
      setAmountToWithdraw(''); // Reset the input field
    } catch (error) {
      console.error('Withdrawal Error:', error.response?.data?.message || 'An error occurred.');
      setWithdrawErrorMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
};


const handleTransferSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTransferErrorMessage('');

    // Validate transfer amount
    if (Number(transferAmount) <= 0) {
        setTransferErrorMessage('Transfer amount must be greater than 0.');
        setLoading(false);
        return;
    }

    try {
        const response = await post('/bank/transfer', { recipientCardNumber, amount: Number(transferAmount) });
        console.log('Transfer response:', response.data);

        
        // Check if the response has the updated funds and is a number
        if (response.data && response.data.funds !== undefined && !isNaN(response.data.funds)) {
            setFunds(response.data.funds); // Update the funds state
        } else {
            throw new Error('Invalid funds value received from the server.');
        }
        
        setTransferAmount(''); // Reset the transfer amount
        setRecipientCardNumber(''); // Reset the recipient card number
    } catch (error) {
        console.error('Transfer Error:', error.response?.data?.message || error.message || 'An error occurred.');
        setTransferErrorMessage(error.response?.data?.message || error.message || 'An error occurred.');
    } finally {
        setLoading(false);
    }
};


  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Account</h1>
      <div className='bank-info'>
        <div className='bank-box'>
          <h2>Savings</h2>
          <div className='bank-line'>
            <p>Balance:</p>
            <p>${funds !== null ? formatNumber(funds) : 'Unavailable'}</p>
          </div>
          <form onSubmit={handleTransferSubmit} className='bank-form'>
                    <input
                        type="text"
                        name="recipientCardNumber"
                        value={recipientCardNumber}
                        onChange={(e) => setRecipientCardNumber(e.target.value)}
                        placeholder="Recipient's Card Number"
                        required
                    />
                    <input
                        type="number"
                        name="transferAmount"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="Amount to Transfer"
                        required
                    />
                    <button type="submit">Transfer</button>
                </form>
                {transferErrorMessage && <div className="error-message">{transferErrorMessage}</div>}
        </div>
        <div className='bank-box'>
          <h2>Investments</h2>
          <div className='bank-line'>
            <p>Balance:</p>
            <p>${investmentFunds !== null ? formatNumber(investmentFunds) : 'Unavailable'}</p>
          </div>
          <form onSubmit={handleInvestmentSubmit} className='bank-form'>
            <input
              type="number"
              name="amountToInvest"
              value={amountToInvest}
              onChange={(e) => setAmountToInvest(e.target.value)}
              placeholder="Amount to invest"
              required
            />
            <button type="submit">Invest</button>
          </form>
          {investmentErrorMessage && <div className="error-message">{investmentErrorMessage}</div>}
          <form onSubmit={handleWithdrawSubmit} className='bank-form'>
            <input
              type="number"
              name="amountToWithdraw"
              value={amountToWithdraw}
              onChange={(e) => setAmountToWithdraw(e.target.value)}
              placeholder="Amount to withdraw"
              required
            />
            <button type="submit">Withdraw</button>
          </form>
          {withdrawErrorMessage && <div className="error-message">{withdrawErrorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
