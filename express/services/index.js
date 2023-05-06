const db = require('mongodb').Db;
const {ObjectId} = require('mongodb'); 
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://127.0.0.1:27017', { monitorCommands: true });
const {selectDB : func_search_DB} = require('../configs');

let mydb = "local";
let coll = "comments";

async function serviceComm(search_name){
    let connection = await client.connect(function(err){
        if (err){
            throw err;
        }
    });
    
    let result = await connection.db(mydb).collection(coll).findOne({name: search_name});

    return result;
}

module.exports = {
    serviceComm
}