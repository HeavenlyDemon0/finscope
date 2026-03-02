const e = require("express");
const m = require("multer");
const { uploadPDF, uploadCSV } = require("../controllers/uploadController");

const r = e.Router();
const u = m({ dest: "uploads/" });

r.post("/pdf", u.single("file"), uploadPDF);
r.post("/csv", u.single("file"), uploadCSV);

module.exports = r;