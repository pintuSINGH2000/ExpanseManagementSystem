const express = require('express');
const { loginController, registerController } = require('../controller/userController');
const { getAllTransactionController, addTransactionController, editTransactionController, deleteTransactionController } = require('../controller/transactionController');

const router = express.Router();

//router
//get all data
router.post('/get-transactions',getAllTransactionController);

//add
router.post('/add-transaction',addTransactionController);

//edit
router.post('/edit-transaction',editTransactionController);

//delete
router.post('/delete-transaction',deleteTransactionController);

module.exports = router;