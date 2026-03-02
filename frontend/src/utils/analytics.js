// Group expenses by category for pie chart
export const getMonthlyCategoryData = (transactions, month, year) => {
  const result = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (
      t.type === "expense" &&
      d.getMonth() === month &&
      d.getFullYear() === year
    ) {
      result[t.category] = (result[t.category] || 0) + t.amount;
    }
  });

  return Object.keys(result).map((key) => ({
    name: key,
    value: result[key],
  }));
};

// Yearly income vs expense
export const getYearlySummary = (transactions, year) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (d.getFullYear() === year) {
      t.type === "income"
        ? (income += t.amount)
        : (expense += t.amount);
    }
  });

  return [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];
};

// Net savings
export const getNetSavings = (transactions, year) => {
  return transactions.reduce((total, t) => {
    const d = new Date(t.date);
    if (d.getFullYear() === year) {
      return t.type === "income"
        ? total + t.amount
        : total - t.amount;
    }
    return total;
  }, 0);
};