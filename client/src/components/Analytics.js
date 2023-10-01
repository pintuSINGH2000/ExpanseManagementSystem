import React from "react";
import { Progress } from "antd";
import PropTypes from "prop-types"

const Analytics = ({ allTransaction , frequency }) => {
  const categories = [
    "salary",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  // total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnOverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnOverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
     { allTransaction && allTransaction.length>0 ? (
      <>
      <div className="row m-0 w-75 m-auto pb-5">
      <div className="col-md-3 p-4 ps-md-0">
        <div className="card">
          <div className="card-header">
            Total Transaction : {totalTransaction}
          </div>
          <div className="card-body">
            <h5 className="text-success">
              Income : {totalIncomeTransactions.length}
            </h5>
            <h5 className="text-danger">
              Expense: {totalExpenseTransactions.length}
            </h5>
            <div>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2 my-2 ps-5"
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2 my-2 ps-5"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 p-4 ps-md-0">
        <div className="card">
          <div className="card-header">Total TurnOver : {totalTurnover}</div>
          <div className="card-body">
            <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
            <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
            <div>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2 my-2 ps-5"
                percent={totalIncomeTurnOverPercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2 my-2 ps-5"
                percent={totalExpenseTurnOverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3 p-4 pe-md-0">
        <h4 className="">Categorywise Income</h4>
        {categories.map((category) => {
          const amount = allTransaction
            .filter(
              (transaction) =>
                transaction.type === "income" &&
                transaction.category === category
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0);
          return (
            amount >0 && (
              <div className="card my-2">
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress
                    percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                  />
                </div>
              </div>
            )
          );
        })}
      </div>

      <div className="col-md-3 p-4 pe-md-0">
        <h4 className="">Categorywise Expense</h4>
        {categories.map((category) => {
          const amount = allTransaction
            .filter(
              (transaction) =>
                transaction.type === "expense" &&
                transaction.category === category
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0);
          return (
            amount >0 && (
              <div className="card my-2">
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress
                    percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                  />
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
    </>
    ): (<h5 className="text-center my-4 w-75 m-auto">{frequency === 'custom' ? "No Data Available" : "No Data Available for last "+frequency+" days"}</h5>)}
     
    </>
  );
};

Analytics.propTypes = {
  allTransaction: PropTypes.array.isRequired, // Expects an array, and it's required.
  frequency: PropTypes.string.isRequired, // Expects a string, and it's required.
};

export default Analytics;
