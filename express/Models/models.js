const express = require('express');
const router = express.Router();
const {ctrlUserGet: userget, 
    ctrlUserPost: userpost,
    deleteObj: deleteDoc,
    ctrlModel: func_model,
    ctrlModelAll: func_modelAll,
    ctrlUpdate: func_update, 
    ctrlDelete: func_delete,
    safe_insertOne: func_safeInsert,
    authorize: login} = require('./controllers/control');

const {errLog: errCatch} = require('./Errors/errCatcher');

function response(){
    console.log("жаба");
}

router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).send('Hello World V3!');
});

router.get('/user/:id', userget, errCatch);
router.post('/user', userpost, errCatch);
router.delete('/deleteByKey', deleteDoc, errCatch);

//create
router.post('/models', login, func_safeInsert, errCatch); 

//read
router.get('/models', func_modelAll, errCatch);
router.get('/models/:id', func_model, errCatch);

//update
router.put('/models/:id', func_update, errCatch);

//delete
router.delete('/models/:id', login, func_delete, errCatch);


module.exports = {
    router,
    response
}