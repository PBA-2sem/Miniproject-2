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
        await collection.insertMany(data.map(entry => { return { ...entry, _id: entry['Order ID'] } }), function (err, resultDocuments) {
            if (err) return console.log(err);
        });
        console.log('MongoDB - Done inserting data')
        const end = performance.now();
        console.log(`MongoDB - Time to store all docs : ${end - start}ms`);
    });
}


async function getRecordMongo(id) {
    const db = mongoClient.db("stuff");
    const collection = db.collection("records");

    const ITERATIONS = 10000;
    let promisesList = []; 

    // Measure time to insert all
    const start = performance.now();
    for (let i = 0; i <= ITERATIONS; i++) {
        promisesList.push(collection.find({ _id: id }))
    }
    await Promise.all(promisesList);
    const end = performance.now();
    console.log(`MongoDB - Time to get single record average : ${(end - start) / ITERATIONS}ms`);
}



module.exports = {
    insertAllData,
    getRecordMongo,
}
