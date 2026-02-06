import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        {/* LEFT */}
        <div className="logo" onClick={() => navigate("/")}>
          Spend<span>Wise</span> AI
        </div>

        {/* CENTER */}
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>

        {/* RIGHT */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
}

