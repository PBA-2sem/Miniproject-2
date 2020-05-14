const mongo = require("mongodb");
const uri = "mongodb://localhost:27017/stuff";
const mongoClient = mongo.MongoClient(uri, { useUnifiedTopology: true });
const { performance } = require('perf_hooks')



async function insertRecordsMongo(data) {

    const client = await mongoClient.connect(uri);
    
    // drop collection if exists
    await db.collection("records").drop();
    const collection = db.collection("records");

    // Measure time to insert all
    const start = performance.now();
    await collection.insertMany(data.map(entry => { return { ...entry, _id: entry['Order ID'] } }), function (err, resultDocuments) {
        if (err) return console.log(err);
    });

    const end = performance.now();
    console.log('MongoDB - Done inserting data')
    console.log(`MongoDB - Time to store all docs : ${end - start}ms`);
}


async function getRecordMongo(id) {
    const db = mongoClient.db("stuff");
    const collection = db.collection("records");

    const ITERATIONS = 10000;
    let promisesList = [];

    // Measure time to insert all
    const start = performance.now();
    for (let i = 0; i <= ITERATIONS; i++) {
        promisesList.push(collection.find({ _id: id }));
    }
    await Promise.all(promisesList).catch(err => console.log('ERROR: ', err))
    const end = performance.now();
    console.log(`MongoDB - Time to get single record average : ${(end - start) / ITERATIONS}ms`);
}



module.exports = {
    insertRecordsMongo,
    getRecordMongo,
}
