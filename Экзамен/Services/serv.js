const generateHash = require('random-hash');
const RandomHash = require('random-hash').RandomHash;
const MongoClient = require('mongodb').MongoClient;
const db = require('mongodb').Db;
const {ObjectId} = require('mongodb'); 
const client = new MongoClient('mongodb://127.0.0.1:27017', { monitorCommands: true });
const {selectDB : selDB, run: conn_run} = require('../Configs/conf');
const { resourceLimits } = require('worker_threads');

async function serviceModels(param){
    console.log("service show models is active");
    let connection = await conn_run();
    let result;
    if (param == "all"){
        result = await connection.db("local").collection("Passwords").find({}, {projection: {username:1, doc:1, signed:1}}).toArray();
    }
    else result = "fail";
    return result;
}

async function serviceSearch(value){
    console.log("service search is active");
    let connection = await conn_run();
    result = await connection.db("local").collection("Passwords").find({pass: value}).toArray();
    console.log(result.length);
    if (result.length > 0) return true;
    else return false;
}

module.exports = {
    serviceModels,
    serviceSearch
}

