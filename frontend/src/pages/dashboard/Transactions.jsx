function Transactions() {
  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold text-purple-500 mb-6">
        Transaction History
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="text-purple-400">
              <th className="pb-3">Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr>
              <td>12 Sep</td>
              <td>Food Delivery</td>
              <td>₹250</td>
              <td>Junk</td>
            </tr>
            <tr>
              <td>14 Sep</td>
              <td>Transport</td>
              <td>₹120</td>
              <td>Essential</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;