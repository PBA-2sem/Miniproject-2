const data = require('./utils.js')
const { insertRecords } = require('./redisInsert')
const { insertAllData } = require('./mongodbInsert');

setup = () => {
    data.then(data => {
        insertRecords(data)
        insertAllData(data)
    })
        .then(data => {
            console.log("success")
        });
}
setup()