const pdf = require("../utils/pdfParser");
const csv = require("../utils/csvParser");

exports.uploadPDF = async (req, res) => {
  try {
    const raw = await pdf(req.file.path);
    res.json({ raw });
  } catch {
    res.status(500).json({ error: 1 });
  }
};

exports.uploadCSV = async (req, res) => {
  try {
    const raw = await csv(req.file.path);
    res.json({ raw });
  } catch {
    res.status(500).json({ error: 1 });
  }
};