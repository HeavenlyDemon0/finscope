import { mockTransactions } from "../../utils/mockTransactions";
import {
  getMonthlyCategoryData,
  getYearlySummary,
  getNetSavings,
} from "../../utils/analytics";

const Home = () => {
  const month = 1; // February (0-based)
  const year = 2024;

  const monthlyPieData = getMonthlyCategoryData(
    mockTransactions,
    month,
    year
  );

  const yearlyData = getYearlySummary(mockTransactions, year);
  const netSavings = getNetSavings(mockTransactions, year);

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Net Savings: ₹{netSavings}</p>

      {/* Pass monthlyPieData to pie chart */}
      {/* Pass yearlyData to bar chart */}
    </div>
  );
};

export default Home;