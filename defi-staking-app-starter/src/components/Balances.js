import React from 'react'
import { asEther } from '../scripts/utils'

const Balances = ({stakingBalance, rewardBalance}) => {
  return (
    <div className='balances-wrapper'>
      <span className='balances-title'>Staking Balance</span>
      <span className='balances-title'>Reward Balance</span>
      <span>{asEther(stakingBalance)} USDT</span>
      <span>{asEther(rewardBalance)} RWD</span>
    </div>
  )
}

export default Balances