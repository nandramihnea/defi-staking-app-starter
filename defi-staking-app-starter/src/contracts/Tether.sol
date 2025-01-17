pragma solidity ^0.5.0;

contract Tether {
    string public name = 'Mock Tether';
    string public symbol = 'mUSDT';
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    // declare events
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _amount
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _amount
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        // require the value to be >= than the balance
        require(balanceOf[msg.sender] >= _value);
        // subtract the money from the sender
        balanceOf[msg.sender] -= _value;
        // add the money to the receiver
        balanceOf[_to] += _value;
        //emit the event of transferring
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}