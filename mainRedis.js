const { getData } = require('./utils.js')
const { insertRecordsRedis, getRecordRedis } = require('./redisInsert')


const ITERATIONS = 1;

async function runRedis() {
    console.log("Loading Data...")
    const data = await getData('records');
    console.log("Inserting Data...")
    const insertTime = await insertRecordsRedis(data);
    console.log("Retrieving data...")
    const getTime = await getRecordRedis('291581714', ITERATIONS);
    console.log(`Redis - Time to store all docs in : ${insertTime}ms`);
    console.log(`Redis - Time to get single record average : ${getTime}ms`);
    process.exit(1)
}

runRedis();