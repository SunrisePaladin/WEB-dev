// class CustomError extends Error {
//     constructor(message, statusCode) {
//         super(message)

//         if (Error.captureStackTrace) {
//             Error.captureStackTrace(this, CustomError)
//         }

//         this.code = code;
//         this.status = status;
//     }
// }

function errLog(err, req, res, next) {
    console.error(err);
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.status
    })
}

module.exports = {
    errLog
    //CustomError
}