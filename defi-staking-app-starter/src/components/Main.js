import React, { useState } from 'react'
import Balances from './Balances'
import usdt from './usdt-logo.png'

const Main = () => {
  const [airdropTime, setAirdropTime] = useState(0);
  const [stakingBalance, setStakingBalance] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(0);

  return (
    <div className='widget-container'>
      <Balances />
      <form className='form'>
        <div className='input-wrapper'>
          <img src={usdt} className="usdt" alt="usdt" />
          <input className="input" type="text" placeholder="Amount to stake" />
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