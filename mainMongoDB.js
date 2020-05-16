const { getData } = require('./utils.js')
const { insertRecordsMongo, getRecordMongo } = require('./mongodbInsert');

const ITERATIONS = 100000;

async function runMongo() {
    console.log("Loading Data...")
    const data = await getData('records');
    console.log("Inserting Data...")
    const timeInsert = await insertRecordsMongo(data)
    console.log("Retrieving data...")
    const timeGet = await getRecordMongo('291581714', ITERATIONS);
    console.log(`MongoDB - Time to store all docs : ${timeInsert}ms`);
    console.log(`MongoDB - Time to get single record average : ${timeGet/ITERATIONS}ms`)
    process.exit(1)
}

runMongo();