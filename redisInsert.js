const redis = require("async-redis");
const client = redis.createClient();
const { performance } = require('perf_hooks');

insertRecordsRedis = async (data) => {

    // drop all keys
    await client.flushall();

    const requestsList = data.map(r => { return ["set", r['Order ID'], JSON.stringify(r)] })
    // Measure time to insert all
    const start = performance.now();

    const re = await client.multi(requestsList)
    await re.exec();

    const end = performance.now();
    return end - start;
}

getRecordRedis = async (id, ITERATIONS) => {
    // Handle as promise.all() so we can await all of them as a single unit for performance
    let promiseList = [];
    const start = performance.now();
    for (let i = 0; i <= ITERATIONS; i++) {
        promiseList.push(client.get(id));
    }
    await Promise.all(promiseList)
    const end = performance.now();
    return end - start;
}

module.exports = {
    insertRecordsRedis,
    getRecordRedis
}