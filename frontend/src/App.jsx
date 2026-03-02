import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Layout
import Sidebar from "./components/Sidebar";

// Auth Pages
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import OTPVerify from "./pages/auth/OTPVerify"; // optional page if you keep it

// Dashboard Pages
import Home from "./pages/dashboard/Home";
import Upload from "./pages/dashboard/Upload";
import Transactions from "./pages/dashboard/Transactions";
import AIInsights from "./pages/dashboard/AIInsights";
import Profile from "./pages/profile/Profile";

/**
 * Protected Route (only checks login, NOT email OTP)
 * OTP is handled only at signup stage as you requested.
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

/**
 * Dashboard Layout with LEFT Sidebar (collapsible)
 */
function DashboardLayout({ children }) {
  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      {/* Left Vertical Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* ================= DEFAULT ROUTE ================= */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />
          }
        />

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Optional OTP page (only used after signup if you want) */}
        <Route path="/verify-otp" element={<OTPVerify />} />

        {/* ================= PROTECTED DASHBOARD ROUTES ================= */}

        {/* Main Dashboard (Home) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Upload Page */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Upload />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Transactions History */}
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* AI Insights Page */}
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AIInsights />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile Page (Editable + Profile Pic) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch All Invalid Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;