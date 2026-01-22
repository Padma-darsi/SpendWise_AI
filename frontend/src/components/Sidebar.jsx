

import { NavLink } from "react-router-dom";
import './sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/expenses">Expenses</NavLink>
      <NavLink to="/analytics">Analytics</NavLink>
      <NavLink to="/alerts">Alerts</NavLink>

        <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>

    </aside>
  );
}

