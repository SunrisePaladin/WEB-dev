const db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://127.0.0.1:27017', { monitorCommands: true });

// async function run(){
//     let db = await client.connect();
//     console.log("Running");
//     return db;
// }

// async function run() {
//     try {
//         const database = client.db('local');
//         const text = database.collection('comments');
//         const query = { name: 'Vlad' };
//         const resp = await text.findOne(query);
//         console.log(resp);
//     } finally {
//       // Ensures that the client will close when you finish/error
//         await client.close();
//     }
//     return db;
// }
//run().catch(console.dir);

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
    client
}