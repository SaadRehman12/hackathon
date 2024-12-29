const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const userRouter = require('./routes/userRoutes');

const todoRouter = require('./routes/todoRoute');

dotenv.config();
connectDb();

const port = 8000;

const corsOptions = {
    origin: "*",  // Allow all origins (change in production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],  // Ensure Authorization is allowed
  };
  
  

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", userRouter);

app.use("/event", todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});