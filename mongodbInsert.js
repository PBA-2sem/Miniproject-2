// const MongoClient = require('mongodb').MongoClient;

const mongo = require("mongodb");
const uri = "mongodb://localhost:27017";
const mongoClient = mongo.MongoClient(uri);



async function insertAllData(data) {
    mongoClient.connect(function (err) {
        if (err) throw err;
        var db = mongoClient.db("stuff");
        var collection = db.collection("records");

        collection.insertMany(data.map(entry => { return { ...entry, _id: entry['Order ID'] } }), function (err, resultDocuments) {
            if(err) return console.log(err);
            console.log('done')
        }); 
    });
}


module.exports = {
    insertAllData: insertAllData,
}
