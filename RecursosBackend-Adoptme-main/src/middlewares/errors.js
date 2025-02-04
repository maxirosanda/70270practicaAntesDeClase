import EErrors from '../utils/errors/enums.js';

export default (error, req, res, next) => {

    switch (error.code) {
        
        case EErrors.INVALID_TYPES_ERROR:
            res.send({ status: "error", error: error.name });
            break;
        case EErrors.INVALID_PARAM:  
            res.status(400).json({ status: "error", error: error.name, cause: error.cause });
            break;
        default:
            res.send({ status: "error", error: "Unhandled error" });
    }
}