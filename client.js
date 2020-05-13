const Redis = require("ioredis");
// const redis = new Redis(); // uses defaults unless given configuration object
 
const redis = new Redis({
    port: 6379,
    host: "127.0.0.1",
    // password: '',
    // db: 0
  });

async function getKeys() {
    const keys = await redis.collection.keys('*');
    const values = await redis.collection.mget(keys);
    console.log(keys)
}

getKeys()