
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

/* Auth check */
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/* Protected Route Wrapper */
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <div className="layout">
                <Sidebar />
                <main className="content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/alerts" element={<Alerts />} />
                  </Routes>
                </main>
              </div>
            </>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
