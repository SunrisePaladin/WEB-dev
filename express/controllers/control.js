const {serviceSearch: service1, 
    serviceAppend: service2, 
    serviceFindAll: service3, 
    serviceSwitch: service4,
    getUser: service5,
    postUser: service6} = require('../services/serv');
const {ObjectId} = require('mongodb'); 

let result="";

async function control1(req, res){
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
        result = await service1(value, mode);
        if (result == null) result = "not found";
        console.log(result);
        res.send(result);
    }
}

async function control2(req, res){
    console.log("control 2");
    console.log(req.params['reqdb']);

    let value = req.query.value;
    console.log(req.query.value);
    if (req.query.id == "" || req.query.name == "" || req.query.text == ""){
        console.log("no append data");
        res.status = 400;
        res.send("No data");
    }
    else {
        let tmp_id = req.query.id;
        console.log(tmp_id);
        let crdate = new Date();
        console.log(crdate);
        let object = {_id: new ObjectId(tmp_id), name: req.query.name, text: req.query.text, cr_date: crdate}; 
        console.log(object);
        result = await service2(object);
        if (result == null) result = "not found";
        console.log(result);
        res.send(result);
    }
}

async function control3(req, res){
    console.log("control 3");
    let massive = await service3();
    console.table(massive);
    if (massive == null) {
        massive = "not found";
        res.status(400).send(massive);
    }
    else{
        res.status(200);
        res.json(JSON.stringify(massive));
    }
}

async function control4(req, res){
    console.log("control 4");
    let newDB = req.params['db'];
    let result = await service4(newDB);
    if (result){
        res.status(200).send("DB has been switched");
    }
    else{
        res.status(404).send("DB not found");
    }
}

async function control5(req, res){
    console.log("control 5");
    new_name = req.params['id'];
    let result = await service5(new_name);
    if (result == null) {
        result = "not found";
        res.status(400).send(result);
    }
    else{
        console.log(result);
        res.status(200).send(`The key of ${result.name} is ${result.key}` );
    }
}

async function control6(req, res){
    if (req.body.username == null){
        console.log("no user persisted");
        res.status(404).send("User not found");
    }
    else{
        let result = await service6(req.body.username);
    }
    res.status(200).send("end of service");
}

module.exports ={
    control1,
    control2,
    control3,
    control4,
    control5,
    control6
}