const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
const NotFoundError = (msg, statusCode) => {
    return new NotFound(msg)
}

module.exports = NotFoundError;
