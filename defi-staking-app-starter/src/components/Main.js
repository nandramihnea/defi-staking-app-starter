import React, { useRef, useState } from 'react'
import Balances from './Balances'
import usdt from './usdt-logo.png'

const Main = ({stakingBalance, tetherBalance, rwdBalance}) => {
  const [airdropTime, setAirdropTime] = useState(0);
  const inputRef = useRef(null);

  const handleMaxClick = () => {
    inputRef.current.value = window.web3.utils.fromWei(tetherBalance, 'ether');
  };

  return (
    <div className='widget-container'>
      <Balances
        stakingBalance={stakingBalance}
        rewardBalance={rwdBalance} />
      <form className='form'>
        <div className='input-wrapper'>
          <img src={usdt} className="usdt" alt="usdt" />
          <input ref={inputRef} className="input" type="text" placeholder="Amount to stake" />
          <div className='amount-wrapper'>
            <span>{window.web3.utils.fromWei(tetherBalance, 'Ether')} Available</span>
            <div className='max' onClick={handleMaxClick}>MAX</div>
          </div>
        </div>
        <div className='buttons'>
          <button className='btn deposit' type="submit">Deposit</button>
          <button className='btn withdraw' type="submit">Withdraw</button>
        </div>
      </form>
      <span>Airdrop {airdropTime}</span>
    </div>
  )
}

export default Main