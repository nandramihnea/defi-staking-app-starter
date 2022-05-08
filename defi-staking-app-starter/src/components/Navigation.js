import React from 'react';
import './style.css';

const Navigation = ({account}) => {
  return (
    <div className='nav'>
        <span className='title'>Decentral Bank Of America</span>
        <span className='account'>ACCOUNT NUMBER: <span style={{color: '#fff'}}>{account}</span></span>
    </div>
  )
}

export default Navigation