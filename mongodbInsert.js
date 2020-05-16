const uri = "mongodb://localhost:27017";
const MongoClient = require('mongodb').MongoClient;
const dbName = 'stuff';

const { performance } = require('perf_hooks')

insertRecordsMongo = async (data) => {

    var time = null;
    console.log("Inside insert function..")
    const db = MongoClient(uri, { useUnifiedTopology: true });
    console.log("after connection function..")

    const dbConnect = await db.connect();
    const dbC = dbConnect.db(dbName);
    var collection;
    try {
        dbC.collection("records").drop();
        collection = dbC.collection("records")
    } catch (err) {
        console.err(err)
    }

    const start = performance.now();

    const results = await collection.insertMany(data.map(entry => { return { ...entry, _id: entry['Order ID'] } }))

    const end = performance.now();
    time = end - start;
    return time
}

getRecordMongo = async (id) => {

    var time = null;

    const db = MongoClient(uri, { useUnifiedTopology: true });

    const dbConnect = await db.connect();
    const dbC = dbConnect.db(dbName);

    var collection;
    try {
        collection = dbC.collection("records")
    } catch (err) {
        console.err(err)
    }
    const ITERATIONS = 10000;
    let promisesList = [];

    // Measure time to insert all
    const start = performance.now();
    for (let i = 0; i <= ITERATIONS; i++) {
        promisesList.push(collection.find({ _id: id }));
    }
    await Promise.all(promisesList);
    const end = performance.now();
    time = end - start;
    return time
}

module.exports = {
    insertRecordsMongo,
    getRecordMongo,
}