// SPDX-License-Identifier: MIT
const UserDataContract = artifacts.require("UserDataContract");

module.exports = function (deployer) {
  deployer.deploy(UserDataContract);
};
