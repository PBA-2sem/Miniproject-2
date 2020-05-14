const csv = require("csv-parser");
const fs = require("fs");

function getData() {
  return new Promise(function (resolve, reject) {
    let results = [];
    fs.createReadStream("records.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
}


module.exports = {
  getData,
}