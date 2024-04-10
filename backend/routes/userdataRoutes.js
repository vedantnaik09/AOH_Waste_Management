const express = require("express");
const router = express.Router();
const verifyUser = require('../controllers/userDataContractController/userUpdateController');
const retrieveUserController = require('../controllers/userDataContractController/retrieveUpdateController');
const registerPlan = require("../controllers/registerPlan/registerForPlan");

router.use(express.json());

router.post('/store', verifyUser);
router.get('/retrieve/tokenId:', retrieveUserController);
router.post('/register', registerPlan);
module.exports = router;