const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

const BadRequestError = (msg, statusCode) => {
    return new BadRequest(msg);
}

module.exports = BadRequestError;
