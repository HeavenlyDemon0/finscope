import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <div className={`bg-slate-900 h-screen p-4 transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white text-2xl mb-6 cursor-pointer"
      >
        ☰
      </button>

      {/* Profile Section */}
      {user && (
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 mb-8 cursor-pointer hover:bg-slate-800 p-2 rounded-lg"
        >
          <img
            src={user.photoURL || "https://i.pravatar.cc/100"}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          {open && <span className="text-white">My Profile</span>}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-4 text-gray-300 select-none">
        <Link to="/dashboard" className="hover:text-purple-400 cursor-pointer">
          {open ? "Dashboard" : "🏠"}
        </Link>

        <Link to="/upload" className="hover:text-purple-400 cursor-pointer">
          {open ? "Upload" : "📤"}
        </Link>

        <Link to="/transactions" className="hover:text-purple-400 cursor-pointer">
          {open ? "Transactions" : "📜"}
        </Link>

        <Link to="/insights" className="hover:text-purple-400 cursor-pointer">
          {open ? "AI Insights" : "🤖"}
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 w-full py-2 rounded-lg hover:bg-red-700 cursor-pointer"
      >
        {open ? "Logout" : "🚪"}
      </button>
    </div>
  );
}

export default Sidebar;