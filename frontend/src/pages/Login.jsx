import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import "./register.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailAddress: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added

  const login = async () => {
    if (loading) return;

    try {
      setLoading(true); // ✅ show "Logging in..."
      const res = await loginUser({
        emailAddress: form.emailAddress.trim(),
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err.response?.data);
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false); // ✅ reset if error
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
        <h2>Welcome Back</h2>

        {/* Email */}
        <div className="input-wrapper">
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" />
              <path d="M4 6l8 7 8-7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>

          <input
            type="email"
            placeholder="Email"
            value={form.emailAddress}
            onChange={(e) =>
              setForm({ ...form, emailAddress: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="input-wrapper password-wrapper">
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect
                x="5"
                y="11"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 11V7a4 4 0 118 0v4"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M10.6 10.6A2 2 0 0012 14a2 2 0 001.4-.6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </span>
        </div>

        <button
          className="register-btn"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-footer">
          New user? <Link to="/register">Register first</Link>
        </p>
      </div>
    </div>
  );
}

