require('dotenv').config();
require('express-async-errors');
// express

const express = require('express');
const app = express();
// rest of the packages
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
var path = require('path');


//  routers
const { authRouter, mainRouter } = require('./routes/index');


// middleware
// const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middlewere/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(fileUpload({
  // useTempFiles: true,
  createParentPath: true,
}));


//using app routers
app.use('/api/v1', [authRouter, mainRouter]);

app.use(errorHandlerMiddleware);


// console.log(path.join(__dirname, '../public'))
module.exports = app;
