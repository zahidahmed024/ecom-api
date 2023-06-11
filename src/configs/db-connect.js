const mongoose = require('mongoose')
const { mongodb_options } = require('./env-config')

const connectDB = () => {
    return mongoose.connect(process.env.MONGODB_URL, mongodb_options)
}

module.exports = connectDB