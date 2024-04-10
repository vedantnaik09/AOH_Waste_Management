const { Web3 } = require("web3");
const { abi } = require("../../../web3/build/contracts/UserDataContract.json"); // Assuming the ABI is stored here

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const contractAddress = "0xF5D7d6F0a3D6a62Fbc9bA6A9a67335118e94fde8"; // Replace with the deployed contract address
const contract = new web3.eth.Contract(abi, contractAddress);

async function registerUser(
  adminUsername,
  username,
  totalDays,
  dailyPlan,
  dates,
  address
) {
  try {
    const transaction = await contract.methods
      .registerUser(adminUsername, username, totalDays, dailyPlan, dates)
      .send({ from: address });

    // Access the tokenId from the transaction receipt
    const tokenId = transaction.events.UserRegistered.returnValues.tokenId;

    console.log("User registered with tokenId:", tokenId);
    return tokenId;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Re-throw the error for further handling
  }
}

async function updateWasteInfo(tokenId, date, wasteInfo, address) {
  try {
    const transaction = await contract.methods
      .updateWasteInfo(tokenId, date, wasteInfo)
      .send({
        from: address,
      });
    console.log(
      "Waste info updated:",
      transaction.events.WasteInfoUpdated.returnValues
    );
  } catch (error) {
    console.error("Error updating waste info:", error);
  }
}

async function getUserData(tokenId) {
  try {
    const userData = await contract.methods.getUserData(tokenId).call();
    console.log("User data:", userData);
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

async function updateAllUserData(tokenId, newUserData, address) {
  try {
    // Get existing dates for efficient wasteInfo updates
    const existingDates = await contract.methods.getUserData(tokenId).call()
      .dates;

    // Update fields individually (replace placeholders with actual contract functions):
    await contract.methods
      .setAdminUsername(tokenId, newUserData.adminUsername)
      .send({ from: address });
    await contract.methods
      .setUsername(tokenId, newUserData.username)
      .send({ from: address });
    await contract.methods
      .setTotalDays(tokenId, newUserData.totalDays)
      .send({ from: address });
    await contract.methods
      .setDailyPlan(tokenId, newUserData.dailyPlan)
      .send({ from: address });

    // Overwrite wasteInfo for existing dates and remove any leftover (if applicable):
    for (const date of existingDates) {
      await contract.methods
        .updateWasteInfo(tokenId, date, newUserData.wasteInfo[date] || "")
        .send({ from: address });
    }

    // Add wasteInfo for new dates (if applicable):
    for (const date of newUserData.dates) {
      if (!existingDates.includes(date)) {
        await contract.methods
          .updateWasteInfo(tokenId, date, newUserData.wasteInfo[date])
          .send({ from: address });
      }
    }

    console.log(`All user data updated for tokenId ${tokenId}`);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error; // Re-throw the error for further handling
  }
}

exports.module = {
  registerUser,
  updateWasteInfo,
  getUserData,
  updateAllUserData,
};
