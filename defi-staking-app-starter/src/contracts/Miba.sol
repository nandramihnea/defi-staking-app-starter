pragma solidity ^0.5.0;

contract Miba {
    string public name = 'Mihnea basket';
    string public symbol = 'MIBA';
    uint256 public totalSupply = 16000000000000000000000000; // 16 million
    uint8 public decimal = 18;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 amount
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _from, uint256 _amount) public returns(bool success) {
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender] -= _amount;
        balanceOf[_from] += _amount;
        emit Transfer(msg.sender, _from, _amount);
        return true;
    }

    function approve(address _spender, uint256 _amount) public returns(bool success) {
        allowance[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }
}
