const { Web3 } = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const abi = require("../../../web3/build/contracts/UserDataContract.json").abi;
const address = process.env.USER_DATA_CONTRACT;
const contract = new web3.eth.Contract(abi, address);

const retrieveUpdateController = async (req, res) => {
    try {
        const tokenId = req.params.tokenId;
        const userData = await contract.methods.getUserData(tokenId).call();

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while retrieving user data' });
    }

}

module.exports = retrieveUpdateController;