// var mongo = require("mongodb");
// var mongoClient = mongo.MongoClient("mongodb://admin:password@localhost:27017");
// var csvData = require("./csv_converter");
// var redis = require("redis");
// var redisClient = redis.createClient();

// // show_id,type,title,director,cast,country,date_added,release_year,rating,duration,listed_in,description
// function populateMongoDB(cb) {
//   mongoClient.connect(function (err) {
//     if (err) throw err;
//     var db = mongoClient.db("records");
//     var collection = db.collection("documents");

//     // show_id,type,title,director,cast,country,date_added,release_year,rating,duration,listed_in,description
//     csvData.then(function (results) {
//       collection.insertMany(results, function (err, resultDocuments) {
//         cb(mongoClient, resultDocuments);
//       });
//     });
//   });
// }

// function populateRedis(code) {
//   populateMongo(function (mongoClient, documents) {
//     redisClient.on("error", function (error) {
//       console.log(error);
//     });
//     var documents = documents.ops;

//     var multis = documents.map(function (document) {
//       document._id = String(document._id);
//       return ["hmset", document._id, document];
//     });

//     redisClient.multi(multis).exec(function (err, replies) {
//       if (err) {
//         console.log(err);
//       } else {
//         code(mongoClient, redisClient, documents);
//       }
//     });
//   });
// }

// module.exports = {
//     populateRedis,
//     populateMongoDB
// }

var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function() {
    console.log('connected');
});