const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log(err);
    let customError = {
        // set default
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong try again later',
    };
    if (err.name === 'ValidationError') {

        let newFormatedErrors = {}
        Object.values(err.errors)
            .forEach((item) => {
                newFormatedErrors[item.path] = item.message
            })
        customError.errors = newFormatedErrors
        customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = 400;
    }
    if (err.name === 'CastError') {
        customError.message = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json(customError);
};

module.exports = errorHandlerMiddleware;