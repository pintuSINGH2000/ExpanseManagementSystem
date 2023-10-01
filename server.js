const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/connectDB')
const path = require('path');


//config dotenv file
dotenv.config();

//database 
connectDB();

//rest object
const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'./client/build')));

//routes
//userRoutes
app.use('/api/v1/users',require('./routes/userRoute'));
//transaction routes
app.use('/api/v1/transactions',require('./routes/transactionRoutes'));


//rest api
app.use("*", function (req,res) {
    res.sendFile(path.join(__dirname,'./client/build/index.html'));;
});

const PORT = 8080 || process.env.PORT ; 

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});
