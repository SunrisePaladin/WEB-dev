const express = require('express');
const router = express.Router();
const { ctrlFindOne: func_ctrlFindOne, 
    ctrlInsert: func_insert, 
    ctrlFindAll: func_ctrlFindAll, 
    ctrlDBswitch: func_ctrlDBswitch} = require('./controllers/control');

function response(){
    console.log("database");
}

router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).send('Hello World V2');
});

router.get('/search/:mode', func_ctrlFindOne);
router.get('/add', func_insert);
router.get('/search_all', func_ctrlFindAll);
//router.post('/switchDB/:db', func_ctrlDBswitch)

module.exports = {
    router,
    response
}