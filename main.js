const data = require('./utils.js')
const { insertAllData } = require('./mongodbInsert');

runner = () => {
    // data.then(data => console.log(data[0]["Item Type"]))
    data.then(data => insertAllData(data));
}

runner()