import React, { useEffect, useState } from "react";
import { Form, Modal, Input, Select, message, Table, DatePicker, Tooltip } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout";
import axios from "axios";
import Spinner from "./Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);


  //table design
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      className:"min-width-8",
      render: (text) => <span>{moment(text).format("YYYY-MM-D")}</span>,
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      key:"date"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      key:"amount"
    },
    {
      title: "Type",
      dataIndex: "type",
      key:"type"
    },
    {
      title: "Category",
      dataIndex: "category",
      key:"category"
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
      key:"refrence"
    },
    {
      title: "Actions",
      className:"min-width-8",
      key:"actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            className="text-primary mx-2"
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2 text-danger"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const getAllTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("users"));
      setLoading(true);
      const res = await axios.post("/transactions/get-transactions", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setLoading(false);
      setAllTransaction(res.data);
    } catch (error) {
      message.error("Fetch Issue with Transactions");
    }
  };
  useEffect(() => {
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try {
      await axios.post("/transactions/delete-transaction", {
        transactionId: record._id,
      });
      getAllTransaction();
      message.success("Transaction Deleted");
    } catch (error) {
      message.error("Unable to delete");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("users"));
      setLoading(true);
      if (editable) {
        await axios.post("/transactions/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: editable._id,
        });
      } else {
        await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
      }
      setLoading(false);
      message.success("Transaction Added Successfully");
      setShowModal(false);
      setEditable(null);
      getAllTransaction();
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };
  return (
    <Layout>
      <div className="filters m-auto w-75 mt-3 row">
        <div className=" col-md-3 my-2">
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last Week</Select.Option>
            <Select.Option value="30">Last Month</Select.Option>
            <Select.Option value="365">Last Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="col-md-3 my-2">
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">
              All&nbsp;&nbsp;&nbsp;&nbsp;
            </Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="col-md-2 my-2 text-lg-center">
          <div className="switch-icons" style={{ width: "85px" }}>
            <UnorderedListOutlined
              className={`m-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`m-2 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
        </div>
        <div className="col-md-2 text-lg-end my-2">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="pb-5">
        {viewData === "table" ? (
          <Table
            className="w-75 m-auto overflow-scroll my-2"
            columns={columns}
            rowKey={(record) => (record._id)}
            style={{tableLayout:"auto"}}
            dataSource={allTransaction}
            pagination={{ defaultPageSize: 5,position:["bottom","left"]}}
           
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record?.description}
                </p>
              ),
            }}
          />
          
         
        ) : (
          <Analytics frequency={frequency} allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add TransAction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="amout" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type="refrence" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          {loading && <Spinner />}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
