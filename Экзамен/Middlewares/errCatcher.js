function errLog(err, req, res, next) {
    console.error(err);
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.status
    })
}

function ctrlBodyCheck(req, res, next){
    console.log("ctrlPassword");
    let str = "Soloviev surname in body"; //проверка по телу
    if (str.indexOf("Soloviev") != -1) next();
    else res.status(403).send("Req.body requires your surname!");
}

module.exports = {
    errLog,
    ctrlBodyCheck
}