const CarbonCredit = artifacts.require("CarbonCredit");

module.exports = async function (deployer, network, accounts) {
  const deployerAddress = "0x599eA0dEE7378B7293884A1626E1f3bdCCD64893"; // Replace with desired address
  await deployer.deploy(CarbonCredit, { from: deployerAddress });
};
