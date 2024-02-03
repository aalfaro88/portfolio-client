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
    const [specificAccountFunds, setSpecificAccountFunds] = useState(0);
    const [loadingFunds, setLoadingFunds] = useState(true);
    const [currentTotal, setCurrentTotal] = useState(0);

    
    const profitTimeInterval = 60000; 

// ----------------------------SAVING FUNCTIONS-------------------------------------

const fetchSpecificAccountFunds = async () => {
    try {
        setLoadingFunds(true);
        const response = await get('/bank/funds/1234123412341234');
        if (response.status === 200 && response.data && !isNaN(response.data.funds)) {
            setSpecificAccountFunds(response.data.funds);
        } else {
            throw new Error('Invalid funds data received.');
        }
    } catch (error) {
        console.error('Error fetching specific account funds:', error.message);
    } finally {
        setLoadingFunds(false);
    }
};

    useEffect(() => {
        fetchSpecificAccountFunds();
    }, []);

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
    
                // Fetch funds for the specific account after successful transfer
                if (recipientCardNumber === '1234123412341234') {
                    fetchSpecificAccountFunds();
                }
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

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(number);
    };


// --------------------------INVESTMENT FUNCTIONS-----------------------------------
    
const handleInvestmentSubmit = async (e) => {
    e.preventDefault();
    setInvestmentErrorMessage('');

    const investmentAmount = Number(amountToInvest);
    if (investmentAmount <= 0) {
        setInvestmentErrorMessage('Investment amount must be greater than 0.');
        return;
    }

    if (investmentAmount > funds) {
        setInvestmentErrorMessage('Investment amount cannot exceed available funds.');
        return;
    }

    try {
        const response = await post('/bank/deposit-to-investment', { amount: investmentAmount });
        if (response.status === 200) {
            setFunds(response.data.funds);
            setInvestmentFunds(response.data.investmentFunds);

            // Update lastUpdate to the current time after successful investment
            const currentTime = Date.now();
            setLastUpdate(currentTime); 

            // Log the timestamp when the investment is made
            console.log("Investment made. Timestamp:", new Date(currentTime).toString());

        } else {
            setInvestmentErrorMessage('An error occurred while making the investment.');
        }
    } catch (error) {
        setInvestmentErrorMessage(error.response?.data?.message || 'An error occurred during the investment process.');
    }

    setAmountToInvest('');
};



// Constants
const growthRatePerMinute = 0.05; // 5% growth per minute

useEffect(() => {
    const fetchFunds = async () => {
        try {
            const fundsResponse = await get('/bank/funds');
            setFunds(fundsResponse.data.funds);
            const investmentFundsResponse = await get('/bank/investment-funds');
            setInvestmentFunds(investmentFundsResponse.data.investmentFunds);
            const lastInvestmentTimestamp = new Date(investmentFundsResponse.data.lastInvestmentTimestamp).getTime(); // Convert to timestamp
            setLastUpdate(lastInvestmentTimestamp);
            
            // Log the last investment timestamp
            console.log("Last investment timestamp:", new Date(lastInvestmentTimestamp).toString());

            // Calculate profit
            const now = Date.now();
            const minutesElapsed = Math.floor((now - lastInvestmentTimestamp) / (1000 * 60)); // Convert milliseconds to minutes
            const profitCalculation = parseFloat(investmentFundsResponse.data.investmentFunds * Math.pow((1 + growthRatePerMinute), minutesElapsed)).toFixed(2);
            console.log("Current investment with profit:", profitCalculation);

        } catch (error) {
            console.error('Error fetching funds or investment funds:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchFunds();
}, []);


const calculateCurrentTotal = () => {
    const now = Date.now();
    const minutesElapsed = Math.floor((now - lastUpdate) / profitTimeInterval); // Calculate full minutes
    const growthFactor = Math.pow(1 + growthRatePerMinute, minutesElapsed);
    const totalWithProfit = investmentFunds * growthFactor; // current total = initial investment + profit
    return parseFloat(totalWithProfit.toFixed(2)); // Round to two decimal places
};

useEffect(() => {
    // Function to update the current total
    const updateCurrentTotal = () => {
        const totalWithProfit = calculateCurrentTotal();
        setCurrentTotal(totalWithProfit);
    };

    // Call the function immediately to set the initial value
    updateCurrentTotal();

    // Set up an interval to update the current total every minute
    const interval = setInterval(updateCurrentTotal, profitTimeInterval);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
}, [investmentFunds, lastUpdate]); // Only re-run the effect if these values change


const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWithdrawErrorMessage('');

    const totalInvestmentWithProfit = calculateCurrentTotal();
    console.log("Sending withdrawal request with amount: ", totalInvestmentWithProfit);

    try {
        // Call the backend API to withdraw from investment
        const response = await post('/bank/withdraw-from-investment', {
            amount: totalInvestmentWithProfit,
            currentTotalWithProfits: totalInvestmentWithProfit
        });
        if (response.status === 200) {
            // Update state with the response data
            setFunds(response.data.funds);
            setInvestmentFunds(response.data.investmentFunds);
            setLastUpdate(Date.now()); // Reset the lastUpdate to now after successful withdrawal
        } else {
            // Handle any errors that aren't thrown
            setWithdrawErrorMessage('An error occurred during the withdrawal.');
        }
    } catch (error) {
        // Handle errors if the request fails
        setWithdrawErrorMessage(error.response?.data?.message || 'An error occurred during the withdrawal process.');
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
                        onWheel={(e) => e.target.blur()}
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
                <p>${formatNumber(currentTotal)}</p>
            </div>
            {investmentFunds > 0 ? (
            // Withdraw form
            <form onSubmit={handleWithdrawSubmit} className='bank-form'>
                <button type="submit">Withdraw All</button>
            </form>
            ) : (
            // Invest form
            <form onSubmit={handleInvestmentSubmit} className='bank-form'>
                <input
                    type="number"
                    name="amountToInvest"
                    value={amountToInvest}
                    onChange={(e) => setAmountToInvest(e.target.value)}
                    onWheel={(e) => e.target.blur()}
                    placeholder="Amount to invest"
                    required
                />
                <button type="submit">Invest</button>
            </form>
            )}
            {investmentErrorMessage && <div className="error-message">{investmentErrorMessage}</div>}
            {withdrawErrorMessage && <div className="error-message">{withdrawErrorMessage}</div>}
        </div>

      </div>
      <div className='account-info'>
        <div className='account-info-section'>
            <h2 className='account-info-title'>Transaction Details</h2>
            <div className='account-info-content'>
                <div className='savings-info'>
                    <h3 className='subtitle'>Savings Account</h3>
                    <p>Explore the transfer feature by sending funds to account 1234123412341234. Transferred funds will reflect immediately. For a hands-on experience, consider creating another account to initiate transfers between two distinct card numbers.</p>
                    <div className='funds-display'>
                        <span>Balance in account 1234123412341234 </span>
                        <span className='funds-amount'>${new Intl.NumberFormat('en-US').format(specificAccountFunds)}</span>
                    </div>
                </div>
                <div className='investments-info'>
                    <h3 className='subtitle'>Investment Account</h3>
                    <p>
                        Put your money to work with our Investment Account! By investing your funds, you benefit from a fantastic growth rate of 5% every minute. 
                    </p>
                    <br />
                    <p>
                        Withdraw any amount back to your Savings Account whenever you want.
                    </p>
                </div>

            </div>
        </div>
    </div>


    </div>
  );
};

export default MyAccount;
