const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransactionController = async (req, res) => {
  try {
    const { frequency, selectedDate,type } = req.body;
    const transaction = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== 'all' && { type })
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const editTransactionController = async (req, res) => {
  try {
     await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const addTransactionController = async (req, res) => {
  try {
    const newTransaction = await transactionModel(req.body).save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTransactionController = async (req, res) => {
  try {
     await transactionModel.findOneAndDelete({_id:req.body.transactionId});
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllTransactionController, addTransactionController,editTransactionController,deleteTransactionController };
