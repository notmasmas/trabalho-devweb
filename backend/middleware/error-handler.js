const {CustomAPIError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (error, req, res, next) => {
    if (error.code === 11000) { //código do MongoDB para duplicate key
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'E-mail já cadastrado' });
    }
    
    if (error instanceof CustomAPIError) {
        return res
                .status(error.statusCode)
                .json({msg: error.message});
    }
    return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({msg: error.message});
}

module.exports = errorHandlerMiddleware;