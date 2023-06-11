
const dotenv = require('dotenv');
dotenv.config()

let environment = process.env.ENVIRONMENT
let port = process.env.PORT
let mongodb_url = process.env.MONGODB_URL

let mongodb_options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
}






module.exports = {
    environment,
    port,
    mongodb_url,
    mongodb_options
}