function AIInsights() {
  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold text-purple-500 mb-6">
        AI Financial Insights
      </h1>

      <div className="space-y-6">
        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl text-yellow-400 font-semibold">
            Behaviour Pattern
          </h2>
          <p className="text-gray-300 mt-2">
            Your spending increases by 40% on weekends.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl text-red-400 font-semibold">
            Junk Spending Alert
          </h2>
          <p className="text-gray-300 mt-2">
            Small frequent transactions detected in snacks and food delivery.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;