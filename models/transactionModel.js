const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid:{
     type:String,
     required:true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type:{
      type:String,
      required:[true,"type is required"]
    },
    category: {
      type: String,
      required: [true, "categroy is required"],
    },
    refrence: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
  },
  { timestamps:true }
);

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
