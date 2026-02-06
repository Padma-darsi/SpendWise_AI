import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added

  const register = async () => {
    if (loading) return;

    try {
      setLoading(true); // ✅ button shows "Registering..."
      await registerUser(form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // ✅ reset if error happens
    }
  };

  return (
    <div className="auth-container">
      {/* Floating lights */}
      <div className="floating-light light1"></div>
      <div className="floating-light light2"></div>
      <div className="floating-light light3"></div>

      <div className="floating-light light4"></div>
      <div className="floating-light light5"></div>
      <div className="floating-light light6"></div>
      <div className="floating-light light7"></div>
      <div className="floating-light light8"></div>
      <div className="floating-light light9"></div>

      <div className="auth-card">
        <h2>Create Account 🚀</h2>
        <p className="auth-subtitle">
          Start managing your expenses smartly. Track spending, view analytics,
          and receive intelligent alerts — all in one place.
        </p>

        <div className="input-wrapper">
          <span className="input-icon">👤</span>
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>

        <div className="input-wrapper">
          <span className="input-icon">📧</span>
          <input
            type="email"
            placeholder="Email Address"
            value={form.emailAddress}
            onChange={(e) =>
              setForm({ ...form, emailAddress: e.target.value })
            }
          />
        </div>

        <div className="input-wrapper password-wrapper">
          <span className="input-icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.72 10.72 0 0112 20c-5 0-9.27-3-11-8 1.15-2.91 3.45-5.28 6.44-6.64"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </span>
        </div>

        <button
          className="register-btn"
          onClick={register}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

