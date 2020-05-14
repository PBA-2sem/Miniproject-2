const { getData } = require('./utils.js')

const { insertRecordsRedis, getRecordRedis } = require('./redisInsert')
const { insertRecordsMongo, getRecordMongo } = require('./mongodbInsert');

const ITERATIONS = 10000;

runMongo = async (data) => {
    await insertRecordsMongo(data)
    await getRecordMongo('900464189', ITERATIONS);
}

runRedis = async (data) => {
    await insertRecordsRedis(data);
    await getRecordRedis('900464189');
}

async function main() {
    const data = await getData('records');

    await runMongo(data);

    await runRedis(data);

}
main();