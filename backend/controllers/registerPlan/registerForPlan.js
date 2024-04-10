const { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const abi = require("../../../web3/build/contracts/UserDataContract.json").abi;
const contractAddress = "0xAeB9E09E9f8AC3357a38484D65e8E450C8e657D0";
const contract = new web3.eth.Contract(abi, contractAddress);

const registerPlan = async (req, res) => {
  try {
    const {
      adminUsername,
      username,
      totalDays,
      dailyPlan,
      signature
    } = req.body;
    const encodedABI = contract.methods
      .registerUser(adminUsername, username, totalDays, dailyPlan, [])
      .encodeABI();
    const message = web3.utils.soliditySha3(
      adminUsername,
      username,
      totalDays,
      dailyPlan,
      []
    );
    const account = await recoverAccount(message, signature);

    const tx = {
      from: account,
      to: contractAddress,
      gas: 500000, // Adjust gas limit accordingly
      data: encodedABI,
    };
    const receipt = await web3.eth.sendTransaction(tx);
    console.log("Transaction receipt:", receipt);
    res.status(200).json({ success: true, receipt });
  } catch (error) {
    console.error("Error Registering data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = registerPlan;
