const assert = require('assert');
const express = require('express');
const {serviceComm: service1} = require('../services/index');


let result="";

async function control1(req, res){
    console.log("control 1");
    if(req.query.id <= 0 && req.query.id > 10 || req.query.name == "" || req.query.text == ""){
        console.log("control data");
        res.statusCode = 400;
        res.send("No data");
    }
    else{
        result = await service1("Vlad"); //как сюда проверку добавить?
        console.log(result);
        res.send(result);
    }
}

function control2(req, res){
    console.log("control 2");
    console.log(req.params['reqdb']);
    if (req.params['reqdb'] != 'local'){
        res.statusCode = 302;
        res.send("App fault 'cause db is not local");
    }
    else{
        res.statusCode = 200;
        res.send(`${req.params.reqdb} is ok`);
    }
}

module.exports ={
    control1,
    control2
}