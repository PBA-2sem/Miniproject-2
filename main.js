const data = require('./utils.js')
const { insertRecords, getRecordRedis } = require('./redisInsert')
const { insertAllData, getRecordMongo } = require('./mongodbInsert');

setup = async () => {
    await data.then(async data => {
        await insertRecords(data)
        await insertAllData(data)
    })
    getRecordRedis('900464189');
    getRecordMongo('900464189');

}
setup()