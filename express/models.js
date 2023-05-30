const express = require('express');
const router = express.Router();
const {ctrlUserGet: userget, 
    ctrlUserPost: userpost,
    deleteObj: deleteDoc,
    ctrlModel: func_model,
    ctrlModelAll: func_modelAll,
    ctrlInsert: func_insert,
    ctrlUpdate: func_update, 
    ctrlDelete: func_delete,
    safe_insertOne: func_safeInsert,
    authorize: login} = require('./controllers/control');

function response(){
    console.log("жаба");
}

router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).send('Hello World V3!');
});

router.get('/user/:id', userget);
router.post('/user', userpost);
router.delete('/deleteByKey', deleteDoc);

//create
router.post('/models', login, func_safeInsert); 

//read
router.get('/models', func_modelAll);
router.get('/models/:id', func_model);

//update
router.put('/models/:id', func_update);

//delete
router.delete('/models/:id', login, func_delete);

module.exports = {
    router,
    response
}