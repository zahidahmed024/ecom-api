
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
const jwt_access_expiration_minutes = process.env.JWT_ACCESS_EXPIRATION_MINUTES
const jwt_refresh_expiration_days = process.env.JWT_REFRESH_EXPIRATION_DAYS






module.exports = {
    environment,
    port,
    mongodb_url,
    mongodb_options,
    jwt_secret,
    jwt_access_expiration_minutes,
    jwt_refresh_expiration_days
}