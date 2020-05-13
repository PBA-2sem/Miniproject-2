var redis = require("redis");
var client = redis.createClient();

insertRecords = async (data) => {
    await data.forEach(record => {
        client.hmset(record["Order ID"], record);
    });
}

module.exports = {
    insertRecords
}