import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 shadow-lg px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-500">
        FinScope
      </h1>

      <div className="space-x-6">
    <Link to="/">Home</Link>
    <Link to="/upload">Upload</Link>
    <Link to="/transactions">Transactions</Link>
    <Link to="/insights">AI Insights</Link>
    <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;