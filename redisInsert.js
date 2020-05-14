const redis = require("async-redis");
const client = redis.createClient();
const { performance } = require('perf_hooks');

insertRecords = async (data) => {
    // drop all keys
    client.flushall();

    // Measure time to insert all
    const start = performance.now();
    // Handle as promise.all() so we can await all of them as a single unit for performance
    let promiseList = [];
    data.forEach(async record => {
        promiseList.push(client.hmset(record["Order ID"], record));
    });

    await Promise.all(promiseList);
    console.log('Redis - Done inserting data')
    const end = performance.now();
    console.log(`Redis - Time to store all docs in : ${end - start}ms`);
}

getRecordRedis = async (id) => {
    // Handle as promise.all() so we can await all of them as a single unit for performance
    let promiseList = [];
    const ITERATIONS = 100000;
    const start = performance.now();
    for (let i = 0; i <= ITERATIONS; i++) {
        promiseList.push(client.hgetall(id).catch(err => console.log(err)));
    }
    await Promise.all(promiseList).catch(err => console.log('ERROR: ', err));
    const end = performance.now();
    console.log(`Redis - Time to get single record average : ${(end - start) / ITERATIONS}ms`);
}

module.exports = {
    insertRecords,
    getRecordRedis,
}