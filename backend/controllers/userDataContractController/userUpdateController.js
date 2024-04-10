// const { Web3 } = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// const abi = require("../../../web3/build/contracts/UserDataContract.json").abi;
// const contractAddress = process.env.USER_DATA_CONTRACT;
// const contract = new web3.eth.Contract(abi);
const send = require("../faucet/sendCryptoFunction");
const { updateAllUserData } = require("./functions");
const verifyUser = (req, res) => {
  const {tokenId, newUserData, address } = req.body;
  const amount = calculate();
  try{
    updateAllUserData(tokenId, newUserData, address);
    send(address, amount);
  }catch(error){
    console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while updating user data' });
  }
}

module.exports = verifyUser;