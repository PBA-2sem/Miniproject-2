const { getData } = require('./utils.js')
const { insertRecordsMongo, getRecordMongo } = require('./mongodbInsert');

const ITERATIONS = 10000;

async function runMongo() {
    console.log("Loading Data...")
    const data = await getData('records');
    console.log("Inserting Data...")
    const insertTime = await insertRecordsMongo(data)
    console.log("Retrieving data...")
    const getTime = await getRecordMongo('900464189', ITERATIONS);
    console.log(`MongoDB - Time to store all docs : ${insertTime}ms`);
    console.log(`MongoDB - Time to get single record average : ${(getTime) / ITERATIONS}ms`);
}

runMongo();