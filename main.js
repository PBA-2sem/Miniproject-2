const data = require('./utils.js')

runner = () => {
    data.then(data => console.log(data[0]["Item Type"]))
}

runner()