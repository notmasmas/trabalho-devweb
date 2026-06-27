const CustomAPIError = require('./custom-api-error');
const {StatusCodes} = require('http-status-codes');

class ForbiddenError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = ForbiddenError;