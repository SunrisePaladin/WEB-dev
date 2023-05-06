const express = require('express');
const bodyParser = require('body-parser');
const { control1: func_control1, control2: func_control2 } = require('./controllers/index');
const router = express.Router();

function response(){
    console.log("database");
}

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/show', func_control1);
//router.get('/add', func_control2);

// router.post('/add/:reqdb', (req, res)=>{
//     console.log(req.params.reqdb);
//     let found_value = func_control2(req, res, req.params.reqdb);
//     console.log(found_value);
//     }
// );

router.post('/add/:reqdb', func_control2);

module.exports = {
    router,
    response
}