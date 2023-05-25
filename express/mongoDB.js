const express = require('express');
const router = express.Router();
const { control1: func_control1, 
    control2: func_control2, 
    control3: func_control3, 
    control4: func_control4,
    control5: func_control5, 
    control6: userpost } = require('./controllers/control');

function response(){
    console.log("database");
}

router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).send('Hello World V2');
});

router.get('/search/:mode', func_control1);
router.get('/add', func_control2);
router.get('/search_all', func_control3);
router.get('/user/:id', func_control5);
router.post('/user', userpost);
//router.post('/switchDB/:db', func_control4)

module.exports = {
    router,
    response
}