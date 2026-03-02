import { useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Send OTP Email Verification (ONLY during signup)
      await sendEmailVerification(userCred.user);

      // Update profile name
      await updateProfile(userCred.user, {
        displayName: form.name,
      });

      // Save extra data in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        createdAt: new Date(),
      });

      alert("Verification email sent successfully! Please check your inbox or spam folder to verify your account 📧");
      navigate("/signin");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
      <div className="bg-slate-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl text-purple-400 mb-6">Create Account</h2>

        <input
          placeholder="Full Name"
          className="w-full p-2 mb-3 bg-slate-800 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-2 mb-3 bg-slate-800 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          className="w-full p-2 mb-3 bg-slate-800 rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full p-2 mb-3 bg-slate-800 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full p-2 mb-2 bg-slate-800 rounded"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />

        <button
          onClick={() => setShowPassword(!showPassword)}
          className="text-sm text-purple-400 mb-4 cursor-pointer"
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 py-2 rounded-xl hover:bg-purple-700"
        >
          Sign Up (OTP Verification)
        </button>
      </div>
    </div>
  );
}

export default SignUp;