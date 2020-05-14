const redis = require("async-redis");
const client = redis.createClient();
const { performance } = require('perf_hooks');

insertRecordsRedis = (data) => {
    // drop all keys
    client.flushall();

    const requestsList = data.map(r => { return ["set", r['Order ID'], JSON.stringify(r)] })
    // Measure time to insert all
    const start = performance.now();

    client.batch(requestsList)
        .exec(function (err, replies) {
            const end = performance.now();
            console.log("MULTI got " + replies.length + " replies");
            console.log('Redis - Done inserting data')
            console.log(`Redis - Time to store all docs in : ${end - start}ms`);
        });
}

getRecordRedis = async (id, ITERATIONS) => {
    // Handle as promise.all() so we can await all of them as a single unit for performance
    let promiseList = [];
    const start = performance.now();
    for (let i = 0; i <= ITERATIONS; i++) {
        promiseList.push(client.get(id));
    }
    await Promise.all(promiseList).catch(err => console.log('ERROR: ', err));
    const end = performance.now();
    console.log(`Redis - Time to get single record average : ${(end - start) / ITERATIONS}ms`);
}

module.exports = {
    insertRecordsRedis,
    getRecordRedis
}