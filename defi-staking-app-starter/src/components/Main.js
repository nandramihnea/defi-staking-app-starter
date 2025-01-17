import React, { useEffect, useState } from 'react'
import { asEther, asWei } from '../scripts/utils';
import Airdrop from './Airdrop';
import { AIRDROPTIME } from './App';
import Balances from './Balances';
import Loader from './Loader';
import usdt from './usdt-logo.png';

const Main = ({
  stakingBalance,
  tetherBalance,
  rwdBalance,
  stakeTokens,
  withdrawTokens,
  airdropTime,
  setAirdropTime,
  issueRewardTokens,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMaxClick = () => {
    setInputValue(asEther(tetherBalance));
    setIsDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    stakeTokens(asWei(inputValue.toString()));
  }

  const handleInputChange = (event) => {
    if(!event.target.validity.valid) return;
    setInputValue(event.target.value);
    // check amount to stake is smaller than the balance
    const availableBalance = asEther(tetherBalance);
    if(parseInt(event.target.value) <= parseInt(availableBalance)) {
      setIsValid(true);
      setValidationMessage('');
      setIsDisabled(false);
    } else {
      if(event.target.value === '') {
        setIsValid(true);
      }
      else {
        setIsValid(false);
        setValidationMessage('Insufficient funds');
      }
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    if(stakingBalance <= asWei('50')) return;

    if(airdropTime === 0) {
      setLoading(true);
      // issueRewardTokens();
      setTimeout(() => {
        setLoading(false);
        setAirdropTime(AIRDROPTIME);
      }, 123000);
    } else {
      setTimeout(() => {
        setAirdropTime(airdropTime - 1);
      }, 1000);
    }
  }, [airdropTime, stakingBalance]);

  const delay = (time) => {
    new Promise(resolve => setTimeout(resolve, time));
  }

  return (
    <div className='widget-container'>
      <Balances
        stakingBalance={stakingBalance}
        rewardBalance={rwdBalance} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='form'>
          <div className='input-wrapper'>
            <img src={usdt} className="usdt" alt="usdt" />
            <input
              value={inputValue}
              onChange={e => handleInputChange(e)}
              className="input"
              pattern="[0-9]*"
              type="text"
              placeholder="Amount to stake" />
            <p className='validation' style={{visibility: !isValid}}>{validationMessage}</p>
            <div className='amount-wrapper'>
              <span>{window.web3.utils.fromWei(tetherBalance, 'Ether')} Available</span>
              <div className='max' onClick={handleMaxClick}>MAX</div>
            </div>
          </div>
          <div className='buttons'>
            <button className='btn deposit' type="submit" disabled={isDisabled || tetherBalance === 0}>Deposit</button>
            <button className='btn withdraw' onClick={withdrawTokens}>Withdraw</button>
          </div>
      </form>
      {loading ? <Loader /> : <Airdrop airdropTime={airdropTime}/>}
    </div>
  )
}

export default Main