var csv = require("csv-parser");
var fs = require("fs");

var uploadFiles = new Promise(function (resolve, reject) {
  var results = [];
  fs.createReadStream("records.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      resolve(results);
    });
});

module.exports = uploadFiles;