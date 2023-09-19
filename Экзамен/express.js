const express = require('express');
const router = express.Router();
const {errLog: errCatch,
    ctrlBodyCheck: bodycheck} = require('./Middlewares/errCatcher');

const {authorize: login,
    ctrlPassword: func_password,
    getAllModels: htmlresp} = require('./controllers/control');

router.get('/', (req, res) => {
    res.status(200).send('Main exam page!');
});

router.get('/models', login, bodycheck, func_password, errCatch);
//router.get('/models', func_password, errCatch);

htmlresp();

module.exports = {
    router,
};
