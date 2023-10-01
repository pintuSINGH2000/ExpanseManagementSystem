import React, { useState,useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import Layout from "../components/Layout";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
      try {
        setLoading(true);
        const {data} = await axios.post("/users/login", values);
        setLoading(false);
        localStorage.setItem("users",JSON.stringify({...data,password:''}))
        message.success("Login Successfull");
        navigate("/");
      } catch (error) {
        setLoading(false);
        message.error("Something went wrong");
      }
  };
   //prevent from login user
   useEffect(() => {
    if(localStorage.getItem("users")){
      navigate("/");
    }
  },[navigate]);
  return (
    <Layout>
      <div className="register d-flex align-items-center justify-content-center">
        <Form className="register-form p-5" layout="vertical" onFinish={submitHandler}>
          <h1 className="text-center text-primary">Signin</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required/>
          </Form.Item>
          {loading && <Spinner />}
          <div className="d-flex align-items-center">
            <Link to="/register">Not a user ? Check here to Register </Link>
            <button className="btn btn-primary ms-4">Signin</button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
