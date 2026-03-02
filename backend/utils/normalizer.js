module.exports = arr =>
  arr.map(r => ({
    date: r.date || r.Date || null,
    merchant: r.merchant || r.Merchant || "Unknown",
    amount: parseFloat(r.amount || r.Amount || 0),
    category: "unknown",
    isJunk: false,
    rawText: JSON.stringify(r)
  }));