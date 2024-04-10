// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet is Ownable {
    using SafeMath for uint256;

    mapping(address => uint256) private lastAccessTime;

    IERC20 public token; // Change to the appropriate token interface

    uint256 public dripAmount; // Amount to drip each time
    uint256 public dripInterval; // Time interval between drips

    event Drip(address indexed to, uint256 amount);

    constructor(address _token, uint256 _dripAmount, uint256 _dripInterval) {
        token = IERC20(_token);
        dripAmount = _dripAmount;
        dripInterval = _dripInterval;
    }

    function drip() external {
        require(
            lastAccessTime[msg.sender] == 0 ||
                block.timestamp >= lastAccessTime[msg.sender].add(dripInterval),
            "Faucet: You can't drip yet"
        );

        lastAccessTime[msg.sender] = block.timestamp;

        token.transfer(msg.sender, dripAmount);
        emit Drip(msg.sender, dripAmount);
    }

    function getLastAccessTime(address user) external view returns (uint256) {
        return lastAccessTime[user];
    }

    function setDripAmount(uint256 _dripAmount) external onlyOwner {
        dripAmount = _dripAmount;
    }

    function setDripInterval(uint256 _dripInterval) external onlyOwner {
        dripInterval = _dripInterval;
    }

    function withdrawTokens(
        address _token,
        uint256 _amount
    ) external onlyOwner {
        IERC20(_token).transfer(msg.sender, _amount);
    }

    function withdrawETH(uint256 _amount) external onlyOwner {
        payable(owner()).transfer(_amount);
    }
}
