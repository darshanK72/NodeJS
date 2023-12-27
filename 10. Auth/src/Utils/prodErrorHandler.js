const castErrorHandler = (err, res) => {
    res.status(400).json({
        status:err.status,
        message: `Invalid value ${err.value} was provided for ${err.path}.`
    })
}

const uniqueErroHandler = (err, res) => {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    res.status(400).json({
        status:err.status,
        message: `The ${field} '${value}' is already taken. Please choose a different ${field}.`
    })
}

const validationErrorHandler = (err, res) => {
    const errorsByField = {};
    for (const field in err.errors) {
        if (err.errors.hasOwnProperty(field)) {
            errorsByField[field] = err.errors[field].message;
        }
    }
    res.status(400).json({
        message: 'Validation Failed',
        errors: errorsByField,
    });
}

const tokenExpiredErrorHandler = (err,res) => {
    res.status(403).json({
        status:err.status,
        message:"Token Expired,Pleae Login Again"
    })
}

const jsonWebTokenErrorHandler = (err,res) => {
    res.status(403).json({
        status:err.status,
        message:"Token Signature is Invalid,Please Login Again"
    })
}

export const prodErrorHandler = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        if (err.name == 'CastError') {
            castErrorHandler(err, res);
        } else if (err.code == 11000) {
            uniqueErroHandler(err, res);
        }else if (err.name == 'ValidationError') {
            validationErrorHandler(err, res);
        }else if(err.name == 'TokenExpiredError'){
            tokenExpiredErrorHandler(err,res);
        }else if(err.name == 'JsonWebTokenError'){
            jsonWebTokenErrorHandler(err,res);
        }else {
            res.status(500).json(err);
        }
    }
}