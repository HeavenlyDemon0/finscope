import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
      <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          Sign In
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-slate-800"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-slate-800"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full bg-purple-600 py-3 rounded-xl hover:bg-purple-700 transition font-semibold"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-gray-400 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;