const data = require('./utils.js')
const { insertRecords } = require('./redisInsert')

setup = () => {
    data.then(data => insertRecords(data))
    .then(data => {
        console.log("success")
    });
}

setup()