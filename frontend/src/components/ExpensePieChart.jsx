import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpensePieChart({ summary }) {
  const data = {
    labels: ["Essential", "Lifestyle", "Junk", "Subscriptions"],
    datasets: [
      {
        data: [
          summary?.essential || 0,
          summary?.lifestyle || 0,
          summary?.junk || 0,
          summary?.subscriptions || 0,
        ],
        backgroundColor: ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-purple-400 mb-4">
        Expense Distribution
      </h2>
      <Pie data={data} />
    </div>
  );
}

export default ExpensePieChart;