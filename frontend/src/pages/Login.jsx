import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailAddress: "",
    password: "",
  });

  const login = async () => {
    try {
      const res = await loginUser({
        emailAddress: form.emailAddress.trim(),
        password: form.password,
      });

      // ✅ store ONLY token
      localStorage.setItem("token", res.data.token);

      navigate("/"); // dashboard
    } catch (err) {
      console.error("Login failed", err.response?.data);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.emailAddress}
          onChange={(e) =>
            setForm({ ...form, emailAddress: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="primary-btn" onClick={login}>
          Login
        </button>

        <p className="auth-footer">
          New user? <Link to="/register">Register first</Link>
        </p>
      </div>
    </div>
  );
}

