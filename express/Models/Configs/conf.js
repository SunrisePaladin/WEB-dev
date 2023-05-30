const db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://127.0.0.1:27017', { monitorCommands: true });

const basicDB = "local";
const basicColl = "keys";
let currentDB = "local";
let currentColl = "keys";


async function run(){
    let connection = await client.connect(function(err){
        if (err){
            throw err;
        }
    });
    return connection;
}

function getCurrent(mode) {
    mode = int(mode);
    if (mode == 1){
        return currentDB;
    }
    if (mode == 2){
        return currentColl;
    }
}

function getDefault(mode){
    mode = int(mode);
    if (mode == 1){
        return basicDB;
    }
    if (mode == 2){
        return basicColl;
    }
}

async function selectDB(suggestDB){
    let connection = await run();
    let result = await connection.db(suggestDB);
    console.log(result);
    if (!result) {
        console.log(result);
        throw new Error(`Database ${suggestDB} not found`);
    }
    else {
        currentDB = suggestDB;
        console.log(`Current database: ${currentDB}`);
        return result;
    }
}

module.exports = {
    getCurrent,
    getDefault,
    selectDB,
    run
}