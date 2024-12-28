const mongos = require('mongoose')


const connectDb = async () =>{
    try {
        await mongos.connect(process.env.DB_URI )
        console.log('Database connected')
    } catch (error) {
        console.log('Database connection failed')
    }
} 
module.exports = connectDb