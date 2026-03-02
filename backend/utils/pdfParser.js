const pdf = require("pdf-parse");
const fs = require("fs");

module.exports = async p => {
  const b = fs.readFileSync(p);
  const d = await pdf(b);
  return d.text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
};