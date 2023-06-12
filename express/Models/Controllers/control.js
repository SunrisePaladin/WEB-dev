const {serviceSearch: servFind, 
    serv_getUser: getUser,
    serv_postUser: postUser,
    serviceDeleteKey: servDeleteKey,
    serviceModels: showModels,
    serviceAddModel: servAddModel,
    serviceDelete: servDelete,
    serviceUpdate: servUpdate,
    serviceSearch: servSearch} = require('../Services/serv');

const {CustomError: myError} = require('../Errors/errCatcher');
const {ObjectId} = require('mongodb'); 

let result="";

function authorize(req, res, next) {
    console.log("authorization!");
    let key = req.headers['x-api-key'];
    if (key == "" || key == null){
        console.log("no control api key");
        res.status(401).json({
            status: "error",
            message: "Unathorized",
        });
    }
    else{
        next();
    }
}

async function ctrlFindOne(req, res, next){
    try{
        console.log("control 1");
        let mode = req.params['mode'];
        let value = req.query.value;
        console.log(req.query.value);
        if (req.query.id == "" || req.query.name == "" || req.query.text == ""){ //любая проверка query/params
            console.log("no control data");
            res.statusCode = 400;
            res.send("No data");
        }   
        else{
            console.log(req.query);
            result = await servFind(value, mode);
            if (result == null) result = "not found";
            console.log(result);
            res.send(result);
        }
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        next(err);
    }
}

async function safe_insertOne(req, res, next){
    console.log("safe insert");
    try{
        let key = req.headers['x-api-key'];
        if (req.body == null){
            res.status(403).send("No data");
            return;
        }
        let obj = req.body;
        result = await servSearch(key, "models");
        if (result == null) {
            res.status(403).send("User with this key is not found!");
            return;
        }
        else {
            result = await servAddModel(obj);
            if (result == null) res.status(500).send("internal error!");
            else {
                console.log(result);
                res.status(200).send(result);
            }
        }
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        next(err);
    }
}

async function ctrlUserGet(req, res, next){
    console.log("control 5");
    try{
        new_name = req.params['id'];
        let result = await getUser(new_name);
        if (result == null) {
            result = "not found";
            res.status(401).send(result);
        }
        else{
            console.log(result);
            res.status(200).send(`The key of ${result.name} is ${result.key}` );
        }
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        err.statusCode = 500;
        next(err);
    }
}

async function ctrlUserPost(req, res, next){
    console.log("userpost");
    try{
        if (req.body.username == null){
            console.log("no user persisted");
            res.status(404).send("User not found");
        }
        else{
            let result = await postUser(req.body.username);
            if (result == null) res.status(403).send("User was not created");
            else res.status(200).send("User has been successfully added");
        }
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        err.statusCode = 500;
        next(err);
    }   
}

async function deleteObj(req, res, next){
    try{
        if (req.headers["x-api-key"] == null){
            console.log("no api key provided");
            res.status(412).send("THAT'S NOT A VALID API KEY!!!");
        }
        else {
            let removed_key = req.headers["x-api-key"];
            console.log(removed_key);
            let result = await servDeleteKey(req.headers["x-api-key"]); //заменить на removed_key
            if (result){
                console.log("Operation completed successfully");
                res.status(200).send("User was deleted");
            }
            else{
                console.log("Operation failed!");
                res.status(503).send("Internal server error...");
            }
        }
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        err.statusCode = 500;
        next(err);
    }
}

async function ctrlModelAll(req, res, next){
    try{
        let models_list;
        models_list = await showModels("all");
        console.table(models_list); 
        res.status(200).json(models_list);
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        err.statusCode = 500;
        next(err);
    }
}

async function ctrlModel(req, res){
    try{
        let model_id = req.params['id'];
        let model = await showModels(model_id);
        console.log(model); 
        res.status(200).json(model);
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        err.statusCode = 500;
        next(err);
    }
}

async function ctrlUpdate(req, res, next){
    try{
        console.log("safe update");
        let id = req.params['id'];
        let model = await showModels(id);
        let new_model = req.body;
        console.log(model);
        let result = await servUpdate(model, new_model);
        if (result) res.status(200).send("Updated");
        else res.status(401).send("Unsucessfully");
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        err.statusCode = 500;
        next(err);
    }
}

async function ctrlDelete(req, res, next){
    try{
        console.log("safe delete");
        let id = req.params['id'];
        let result = await servDelete(id);
        if (result) res.status(200).send("Deleted");
        else res.status(401).send("Unsucessfully");
    }
    catch(error){
        let err = new Error(error.message);
        err.status = "error";
        err.statusCode = 500;
        next(err);
    }
}

module.exports = {
    ctrlFindOne,
    safe_insertOne, //insert one with authorization
    ctrlUserGet, //userget
    ctrlUserPost, //userpost
    deleteObj, //no use
    ctrlModel, //show model
    ctrlModelAll, //show models
    ctrlUpdate,
    ctrlDelete,
    authorize,
}