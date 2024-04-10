const { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const abi = require("../../../web3/build/contracts/CarbonCredit.json").abi;
const contractAddress = "0x743E893669ED02D8af22adc88e69Ac0917088c48"
const deployerPrivateKey = "0x028afeacd5066565ae71a1adf2de30054237bdc8b965c637a67ae79602ddcb6c";

async function send(address, amount) {
  try {
    const toAddress = address;
    const deployerAccount = "0x599eA0dEE7378B7293884A1626E1f3bdCCD64893"; // Assuming the first account is the deployer

    const contract = new web3.eth.Contract(abi, contractAddress);

    // Sign the transaction using the deployer's private key
    const tx = contract.methods.transfer(toAddress, amount).encodeABI();
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        from: deployerAccount,
        gasPrice: await web3.eth.gasPrice(),
        gas: await contract.methods.transfer(toAddress, amount).estimateGas(),
        to: contractAddress,
        data: tx,
      },
      deployerPrivateKey
    );

    // Broadcast the signed transaction
    const txHash = await web3.eth.sendTransaction(signedTx.transaction);

    console.log(`Transaction hash: ${txHash}`);
    console.log(`Successfully sent ${amount} CBC tokens to ${toAddress}`);
  } catch (error) {
    console.error("Error sending tokens:", error);
  }
}

