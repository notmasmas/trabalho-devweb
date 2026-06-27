const CustomAPIError = require('./custom-api-error');
const UnauthenticatedError = require('./unauthenticated');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const ForbiddenError = require('./forbidden');

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    BadRequestError,
    NotFoundError,
    ForbiddenError
}
