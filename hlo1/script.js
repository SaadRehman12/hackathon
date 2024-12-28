const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const port = 8000
const connectDb = require('./config/db')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoute')
const todoRouter = require('./routes/todoRoute')

app.use(cors())
app.use(bodyParser.json())
dotenv.config()
connectDb()
app.use(bodyParser.urlencoded({ extended: true}))

app.use("/auth",userRouter)
app.use("/product",productRouter)
app.use("/todo",todoRouter)
app.listen(port, () => {
   console.log(`server is running on port ${port}`);
})