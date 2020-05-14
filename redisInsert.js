const redis = require("redis");
const client = redis.createClient();
const { performance } = require('perf_hooks');

insertRecords = async (data) => {
    // Measure time to insert all
    const start = performance.now();
    await data.forEach(record => {
        client.hmset(record["Order ID"], record);
    });
    const end = performance.now();
    console.log(`Time to store all docs in Redis : ${end - start}ms`);
}

module.exports = {
    insertRecords
}