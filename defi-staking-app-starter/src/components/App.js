import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import Rwd from '../truffle_abis/Rwd.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main from './Main';
import Loader from './Loader';

const App = () => {
    const [account, setAccount] = useState('0x0000000000000000000000000000000000000000');
    const [tether, setTether] = useState({});
    const [tetherBalance, setTetherBalance] = useState('0');
    const [rwd, setRwd] = useState({});
    const [rwdBalance, setRwdBalance] = useState('0');
    const [decentralBank, setDecentralBank] = useState({});
    const [stakingBalance, setStakingBalance] = useState('0');
    const [isSwitch, setIsSwitch] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWeb3 = async () => {
            if(window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            } else if(window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            } else {
                const networkId = await window.web3.eth.net.getId();
                // if(networkId !== 5777) {
                //     // window.alert('No ethereum browser detected. Please install MetaMask.');
                // } else {
                //     // window.alert('Switch network')
                // }
            }
        }

        loadWeb3();
    }, []);

    useEffect(() => {
        const loadBlockchainData = async () => {
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            const networkId = await web3.eth.net.getId();

            // Load Tether contract
            const tetherData = Tether.networks[networkId];
            if(tetherData) {
                const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
                setTether(tether);
                let tetherBalance = await tether.methods.balanceOf(account).call();
                setTetherBalance(tetherBalance.toString());
            } else {
                // window.alert('Tether contract not deployed to this network.');
            }

            // Load Rwd contract
            const rwdData = Rwd.networks[networkId];
            if(rwdData) {
                const rwd = new web3.eth.Contract(Rwd.abi, rwdData.address);
                setRwd(rwd);
                let rwdBalance = await rwd.methods.balanceOf(account).call();
                setRwdBalance(rwdBalance.toString());
            } else {
                // window.alert('Rwd contract not deployed to this network.');
            }

            // Load DecentralBank contract
            const decentralBankData = DecentralBank.networks[networkId];
            if(decentralBankData) {
                const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
                setDecentralBank(decentralBank);
                let stakingBalance = await decentralBank.methods.stakingBalance(account).call();
                setStakingBalance(stakingBalance.toString());
            } else {
                // window.alert('DecentralBank contract not deployed to this network.');
            }
        }

        loadBlockchainData();
        setLoading(false);
    }, [loading, account]);

    return (
        <>
            <Navigation account={account} />
            {loading ? <Loader /> :
                <Main
                    tetherBalance={tetherBalance}
                    rwdBalance={rwdBalance}
                    stakingBalance={stakingBalance}
                />
            }
        </>
    )
}

export default App