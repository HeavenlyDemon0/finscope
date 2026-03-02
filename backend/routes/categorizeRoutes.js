const e = require("express");
const { categorize, manual } = require("../controllers/categorizeController");

const r = e.Router();

r.post("/", categorize);
r.post("/manual", manual);

module.exports = r;