require("dotenv").config()
const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if(connected) {
            console.log("connected to mongodb")
        }
    } catch(err) {
        console.error("error attempt to connect database from mongoose")
        console.error(err)
    }
}

module.exports = connectDB
