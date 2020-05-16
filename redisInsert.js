const redis = require("async-redis");
const client = redis.createClient();
const { performance } = require('perf_hooks');

insertRecordsRedis = async (data) => {

    // drop all keys
    await client.flushall();

    const requestsList = data.map(r => { return ["set", r['Order ID'], JSON.stringify(r)] })
    // Measure time to insert all
    const start = performance.now();

    const re = await client.batch(requestsList)
    await re.exec();

    const end = performance.now();
    return end - start;
}

getRecordRedis = async (id, ITERATIONS) => {
    const start = performance.now();
    for (let i = 0; i <= ITERATIONS; i++) {
        await client.get(id);
    }
    const end = performance.now();
    return end - start;
}

module.exports = {
    insertRecordsRedis,
    getRecordRedis
}