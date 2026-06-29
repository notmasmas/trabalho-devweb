const {NotFoundError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const notFound = (req, res) => {
    throw new NotFoundError('Route does not exist');
}

module.exports = notFound;