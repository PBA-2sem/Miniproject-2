const { MongoClient } = require('mongodb');

const uri = "mongodb://admin:password@localhost:27017";


const client = new MongoClient(uri);
const connection = undefined;

async function insertAllData(data) {
    if (!connection) await connectToDB();
    const db = client.db.records;
    db.insertMany(
        data.map(entry => { return { ...entry, _id: entry['Order ID'] } }),
        { ordered: false }
    )
}

async function connectToDB() {
    const conn;
    try {
        conn = await client.connect();
        connection = conn;
    } catch (err) {
        console.log(err);
        return false;
    }
    return true;
}

module.exports = {
    insertAllData: insertAllData,

}
