const {serviceSearch: service1, serviceAppend: service2, serviceFindAll: service3} = require('../services/index');
const {ObjectId} = require('mongodb'); 

let result="";

async function control1(req, res){
    console.log("control 1");
    let mode = req.params['mode'];
    let value = req.query.value;
    console.log(req.query.value);
    if 
    // (req.params['name'] == "" || req.params['text'] == ""){
    (req.query.id == "" || req.query.name == "" || req.query.text == ""){ //любая проверка query/params
        console.log("no control data");
        res.statusCode = 400;
        res.send("No data");
    }
    else{
        console.log(req.query);
        result = await service1(value, mode);
        if (result == null) result = "not found";

        //result = await service1(req.query.name);
        //result = await service1("Vlad");
        console.log(result);
        res.send(result);
    }
}

async function control2(req, res){
    console.log("control 2");
    console.log(req.params['reqdb']);
    // if (req.params['reqdb'] != 'local'){
    //     res.statusCode = 302;
    //     res.send("App fault 'cause db is not local");
    // }
    // else{
    //     result = "Vlad";
    //     res.statusCode = 200;
    //     res.send(`${req.params.reqdb} is ok`);
    // }

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
        //let object = {name: req.query.name, text: req.query.text}; 
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
        //res.send(massive);
    }
}

module.exports ={
    control1,
    control2,
    control3
}