pragma solidity ^0.5.0;
import './Rwd.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank of America';
    address public owner;
    Tether public tether;
    Rwd public rwd;

    address[] public stakers;

    // keep track of the staking balance
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Rwd _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // staking function
    function depositTokens(uint amount) public payable {
        // check if amount is greater than 0
        require(amount > 0, "Amount must be greater than 0");

        // Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), amount);

        // update staking balance
        stakingBalance[msg.sender] += amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // issue reward tokens
    function issueTokens() public {
        // require that only the owner can issue tokens
        require(msg.sender == owner, "Only the owner can issue tokens");

        for(uint i=0; i<stakers.length; i++) {
            address recepient = stakers[i];
            // staking reward would be the amount they staked divided by 9
            uint balance = stakingBalance[recepient] / 9;
            if(balance > 0) {
                rwd.transfer(recepient, balance);
            }
        }
    }

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'You must have staked tokens to unstake');

        // transfer the staked tokens back to the sender
        tether.transfer(msg.sender, balance);

        // update staking balance
        stakingBalance[msg.sender] = 0;

        // update staking status
        isStaking[msg.sender] = false;
    }
}
