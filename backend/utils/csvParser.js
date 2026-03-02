const fs = require("fs");
const csv = require("csv-parser");

module.exports = path =>
  new Promise(resolve => {
    const out = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", r => out.push(r))
      .on("end", () => resolve(out));
  });