import React from 'react'

const Balances = ({stakingBalance, rewardBalance}) => {
  return (
    <div className='balances-wrapper'>
      <span className='balances-title'>Staking Balance</span>
      <span className='balances-title'>Reward Balance</span>
      <span>{window.web3.utils.fromWei(window.web3.utils.toBN(stakingBalance), 'Ether')} USDT</span>
      <span>{window.web3.utils.fromWei(window.web3.utils.toBN(rewardBalance), 'Ether')} RWD</span>
    </div>
  )
}

export default Balances