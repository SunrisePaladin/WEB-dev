const generateHash = require('random-hash');
const RandomHash = require('random-hash').RandomHash;
const MongoClient = require('mongodb').MongoClient;
const db = require('mongodb').Db;
const {ObjectId} = require('mongodb'); 
const client = new MongoClient('mongodb://127.0.0.1:27017', { monitorCommands: true });
const {selectDB : selDB, run: conn_run} = require('../configs/conf');

let result = "undefined";
let mydb = "local"; //локальная бд "local"
let coll = "comments"; //коллекция "comments"

async function serviceSearch(value, mode){
    console.log("service search is active");
    let connection = await conn_run();
    result = "unregistered mode";
    switch (mode){
        case "name":   
            result = await connection.db(mydb).collection(coll).findOne({name: value});
            break;
        case "id":
            result = await connection.db(mydb).collection(coll).findOne({_id: new ObjectId(value)});
            break;
        case "text":
            result = await connection.db(mydb).collection(coll).findOne({text: value});
            break;
        case "time":
            result = await connection.db(mydb).collection(coll).findOne({cr_date: value});
            break;    
        default:
            result = "unregistered mode";
            break;
    }
    return result;
}

async function serviceAppend(object){
    console.log("service add is active");
    let connection = await conn_run();
    result = await connection.db(mydb).collection(coll).insertOne(object);
    return result;
}

async function getUser(username){
    console.log("service getUser is active");
    let connection = await conn_run();
    result = await connection.db(mydb).collection("keys").findOne({name: username});
    return result;
}

async function serviceFindAll(){
    let massResult;
    console.log("service find all is active");
    let connection = await conn_run();
    massResult = await connection.db(mydb).collection(coll).find({}).toArray();
    console.log(massResult);
    return massResult;
}

async function serviceSwitch(newDB){
    console.log("service switch is active");
    let res = await selDB(newDB);
    if (res){
        return true;
    }
    else return false;
}

async function postUser(username){
    console.log("service postUser is active");
    let connection = await conn_run();
    const generateHash = new RandomHash({length: 32, charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'});
    let Hashkey = generateHash();
    console.log(Hashkey);
    let result = await connection.db(mydb).collection("keys").insertOne({name: username, key: Hashkey});
    console.log(result);
    return result;
}

module.exports = {
    serviceSearch,
    serviceAppend, 
    serviceFindAll,
    serviceSwitch,
    getUser,
    postUser
}