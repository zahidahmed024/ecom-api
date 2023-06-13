
const dotenv = require('dotenv');
dotenv.config()

// environment & port
let environment = process.env.ENVIRONMENT
let port = process.env.PORT


//mongodb url & options
let mongodb_url = process.env.MONGODB_URL

let mongodb_options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
}

// jwt config
const jwt_secret = process.env.JWT_SECRET






module.exports = {
    environment,
    port,
    mongodb_url,
    mongodb_options,
    jwt_secret
}