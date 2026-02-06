import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* HEADER */}
      <header className="home-header">
        <h1>Welcome to SpendWise AI</h1>
        <p>
          Track, categorize, and analyze your expenses with smart insights and alerts.
        </p>
      </header>


            <header className="feature-header">
        <h1>Key Features</h1>
       
      </header>


      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <div className="overlay">
            <h3>Expense Management</h3>
            <p>Add, edit, and categorize your daily expenses securely.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="overlay">
            <h3>Analytics & Insights</h3>
            <p>Understand spending patterns using visual charts.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="overlay">
            <h3>Alerts & Budgets</h3>
            <p>Get notified when your spending exceeds limits.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <button
          className="btn-primary"
          onClick={() => navigate("/expenses")}
        >
          Add Expense
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </section>
    </div>
  );
}
