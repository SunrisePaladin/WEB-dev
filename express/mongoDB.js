const express = require('express');
//const bodyParser = require('body-parser');
//const show_router = express.Router();
const router = express.Router();
const { control1: func_control1, control2: func_control2, control3: func_control3 } = require('./controllers/index');

function response(){
    console.log("database");
}

// router.get('/search/', function(req, res){
//     //undefined
//     res.status(200).send('You have 3 options to choose from: id, name, text');
// });
router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).send('Hello World V2');
});

router.get('/search/:mode', func_control1);

router.get('/search_all', func_control3);

router.get('/add', func_control2);

//типа свитч бд добавить сюда?
// router.post('/add/:reqdb', (req, res)=>{
//     console.log(req.params.reqdb);
//     let found_value = func_control2(req, res, req.params.reqdb);
//     console.log(found_value);
//     }
// );

//router.post('/add/:reqdb', func_control2);

module.exports = {
    router,
    response
}