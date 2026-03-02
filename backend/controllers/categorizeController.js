const normalize = require("../utils/normalizer");
const ai = require("../utils/aiCategorizer");
const T = require("../models/Transaction");

exports.categorize = async (req, res) => {
  try {
    const userId = req.body.userId;
    const norm = normalize(req.body.transactions);
    const cats = await ai(norm);

    const saved = [];
    const unknown = [];

    for (let i = 0; i < cats.length; i++) {
      const docData = {
        userId,
        date: norm[i].date,
        merchant: norm[i].merchant,
        amount: norm[i].amount,
        category: cats[i].category,
        isJunk: cats[i].isJunk,
        confidence: cats[i].confidence,
        rawText: norm[i].rawText,
        createdAt: new Date()
      };

      const doc = await T.add(docData);
      const fullDoc = { id: doc.id, ...docData };

      saved.push(fullDoc);
      if (docData.confidence < 0.6) unknown.push(fullDoc);
    }

    res.json({ saved, unknown });
  } catch {
    res.status(500).json({ error: 1 });
  }
};

exports.manual = async (req, res) => {
  try {
    const { id, isJunk } = req.body;
    await T.doc(id).update({
      isJunk,
      category: isJunk ? "junk" : "healthy",
      confidence: 1
    });
    res.json({ ok: 1 });
  } catch {
    res.status(500).json({ error: 1 });
  }
};