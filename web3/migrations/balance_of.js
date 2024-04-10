const CarbonCredit = artifacts.require("CarbonCredit");

(async () => {
  const deployedContract = await CarbonCredit.deployed();
  const deployerAddress = "0x599eA0dEE7378B7293884A1626E1f3bdCCD64893"; // Replace with actual deployer address

  const balance = await deployedContract.balanceOf(deployerAddress);
  const formattedBalance = balance.toString() / (10**18); // Assuming 18 decimals for your token

  console.log(`Deployer balance of CarbonCredit: ${formattedBalance} CBC`);
})();
