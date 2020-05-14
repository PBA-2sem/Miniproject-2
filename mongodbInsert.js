const uri = "mongodb://localhost:27017";
const MongoClient = require('mongodb').MongoClient;
const dbName = 'stuff';

const { performance } = require('perf_hooks')



insertRecordsMongo = async (data) => {

    var time = null;

    const db = MongoClient(uri, { useUnifiedTopology: true });

    await db.connect().then((client) => {

        var db = client.db(dbName);

        // drop collection if exists
        db.collection("records").drop();
        const collection = db.collection("records");

        // Measure time to insert all
        const start = performance.now();
 
        collection.insertMany(data.map(entry => { return { ...entry, _id: entry['Order ID'] } }), function (err, resultDocuments) {
            if (err) return console.log(err);
        });
        const end = performance.now();
        time = end - start;
    })
    return time;
}


getRecordMongo = async (id) => {

    var time = null;

    const db = MongoClient(uri, { useUnifiedTopology: true });

    await db.connect().then((client) => {

        var db = client.db(dbName);

        const collection = db.collection("records");

        const ITERATIONS = 10000;
        let promisesList = [];

        // Measure time to insert all
        const start = performance.now();
        for (let i = 0; i <= ITERATIONS; i++) {
            promisesList.push(collection.find({ _id: id }));
        }
        Promise.all(promisesList).catch(err => console.log('ERROR: ', err))
        const end = performance.now();
        time = end - start;
    })
    return time;
}



module.exports = {
    insertRecordsMongo,
    getRecordMongo,
}
