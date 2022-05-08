import React from 'react'

const Balances = ({stakingBalance, rewardBalance}) => {
  return (
    <div className='balances-wrapper'>
      <span className='balances-title'>Staking Balance</span>
      <span className='balances-title'>Reward Balance</span>
      <span>{stakingBalance}</span>
      <span>{rewardBalance}</span>
    </div>
  )
}

export default Balances