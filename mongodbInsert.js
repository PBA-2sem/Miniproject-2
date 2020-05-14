// const MongoClient = require('mongodb').MongoClient;

const mongo = require("mongodb");
const uri = "mongodb://localhost:27017";
const mongoClient = mongo.MongoClient(uri, { useUnifiedTopology: true });
const { performance } = require('perf_hooks')



async function insertAllData(data) {

    mongoClient.connect(async function (err) {
        if (err) throw err;
        const db = mongoClient.db("stuff");
        await db.collection("records").drop();
        const collection = db.collection("records");

        // Measure time to insert all
        const start = performance.now();
        collection.insertMany(data.map(entry => { return { ...entry, _id: entry['Order ID'] } }), function (err, resultDocuments) {
            if (err) return console.log(err);
            console.log('Done inserting data into mongoDB')
        });
        const end = performance.now();
        console.log(`Time to store all docs in mongo : ${end - start}ms`);
    });
}




module.exports = {
    insertAllData: insertAllData,
}
