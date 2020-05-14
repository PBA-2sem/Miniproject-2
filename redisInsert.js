const redis = require("redis");
const client = redis.createClient();
const { performance } = require('perf_hooks');

insertRecordsRedis = (data) => {

    // drop all keys
    client.flushall();

    const requestsList = data.map(r => { return ["set", r['Order ID'], JSON.stringify(r)] })
    // Measure time to insert all
    const start = performance.now();

    client.multi(requestsList)
        .exec();

    const end = performance.now();
    return end - start;
}

getRecordRedis = (id, ITERATIONS) => {
    // Handle as promise.all() so we can await all of them as a single unit for performance
    let promiseList = [];
    const start = performance.now();
    for (let i = 0; i <= ITERATIONS; i++) {
        promiseList.push(client.get(id));
    }
    Promise.all(promiseList).catch(err => console.log('ERROR: ', err));
    const end = performance.now();
    return end - start;
}

module.exports = {
    insertRecordsRedis,
    getRecordRedis
}