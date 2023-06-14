const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log('errorHandlerMiddleware', err);
    let statusCode = err.statusCode || 500

    let customError = {
        // set default
        status: 'failed',
        message: err.message || 'Something went wrong try again later',
    };

    // custom error sent by
    if (err.name === 'customValidationError') {
        // console.log('error-handler', err)
        customError.errors = err.errors
        statusCode = 400;
    }

    //mongoose validation errors
    if (err.name === 'ValidationError') {
        let newFormatedErrors = {}
        Object.values(err.errors)
            .forEach((item) => {
                newFormatedErrors[item.path] = item.message
            })
        customError.errors = newFormatedErrors
        customError.message = "validation error"
        statusCode = 400;
    }
    if (err.code && err.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        statusCode = 400;
    }
    if (err.name === 'CastError') {
        customError.message = `No item found with id : ${err.value}`;
        statusCode = 404;
    }

    return res.status(statusCode).json(customError);
};

module.exports = errorHandlerMiddleware;