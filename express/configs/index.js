const db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://127.0.0.1:27017', { monitorCommands: true });

async function run(){
    let connection = await client.connect(function(err){
        if (err){
            throw err;
        }
    });
    return connection;
}

async function selectDB(suggestDB){
    if(!suggestDB){
        throw new Error('Database is not defined');    
    }
    try{
        let database = client.db(suggestDB);
        console.log(`Trying to connect to a database ${suggestDB}`);
    }
    catch(err){
        throw new Error(`Database ${suggestDB} not found`);
    }
    finally{
        return database;
    }
}

module.exports = {
    selectDB,
    client,
    run
}