function InsightCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
        <h3 className="text-gray-400">Junk Spending</h3>
        <p className="text-2xl font-bold text-red-400 mt-2">
          ₹3,200
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Major leak detected in small frequent purchases
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
        <h3 className="text-gray-400">Top Behaviour Pattern</h3>
        <p className="text-2xl font-bold text-yellow-400 mt-2">
          Weekend Spikes
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Spending increases 40% on weekends
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
        <h3 className="text-gray-400">Financial Personality</h3>
        <p className="text-2xl font-bold text-green-400 mt-2">
          Conscious Spender
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Stable essentials, moderate lifestyle spending
        </p>
      </div>
    </div>
  );
}

export default InsightCards;