class CustomValidationError extends Error {
    constructor(statusCode, errors, message) {
        super(message);
        this.statusCode = statusCode || 400;
        this.name = 'customValidationError';
        this.errors = errors
    }
}

module.exports = CustomValidationError