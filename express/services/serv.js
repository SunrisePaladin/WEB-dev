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

async function deleteKey(key){
    console.log("service deleteKey is active");
    let connection = await conn_run();
    let result = await connection.db(mydb).collection("keys").findOneAndDelete({key: key});
    //console.table(result.value); 
    //if (result.deletedCount == 0) return false;
    if (result.value == null) return false;
    else return true;
}

async function serviceModels(param){
    console.log("service show models is active");
    //console.log(param);
    let connection = await conn_run();
    let result;
    if (param == "all"){
        result = await connection.db(mydb).collection("models").find({}, {projection: {model_name:1}}).toArray();
    }
    else{
        result = await connection.db(mydb).collection("models").findOne({_id: new ObjectId(param)});
    }
    return result;
}

async function serviceAddModel(object){
    console.log("service add model is active");
    let connection = await conn_run();
    let result = await connection.db(mydb).collection("models").insertOne(object);
    return result;
}

async function serviceUpdate(object, new_object){
    console.log("service update model is active");
    let connection = await conn_run();
    let user_name, model_name, model_type, desc;
    if (new_object.user_name != object.user_name) user_name = new_object.user_name;
    if (new_object.model_name != object.model_name) model_name = new_object.model_name;
    if (new_object.model_type != object.model_type) model_type = new_object.model_type;
    if (new_object.desc != object.desc) desc = new_object.desc;
    let crdate = new Date();
    let result = await connection.db(mydb).collection("models").updateOne({_id: new ObjectId(object['_id'])}, {$set: {user_name : user_name, model_name: model_name, model_type: model_type, desc: desc, cr_time: crdate}});
    console.log(result);
    return result;
}

async function serviceDelete(id){
    console.log("service delete model is active");
    let connection = await conn_run();
    let result = await connection.db(mydb).collection("models").deleteOne({_id: new ObjectId(id)});
    return result;
}

module.exports = {
    serviceSearch,
    serviceAppend, 
    serviceFindAll,
    serviceSwitch,
    getUser,
    postUser,
    deleteKey,
    serviceModels,
    serviceAddModel,
    serviceDelete,
    serviceUpdate
}