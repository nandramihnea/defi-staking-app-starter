import React from 'react'

const Airdrop = ({airdropTime}) => {
  return (
    <span className='airdrop'>Next reward <span className='timer'>{airdropTime}</span></span>
  )
}

export default Airdrop