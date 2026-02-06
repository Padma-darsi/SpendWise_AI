import '../pages/Dashboard.css'

const DashboardComponent = ({
  totalExpenses,
  totalSpent,
  highestCategory,
  currentMonthSpent
}) => {
  return (
    <div className="dashboard-page">

      {/* ===================== INTRO CARD ===================== */}
      <div className="dashboard-intro">
        <h2>Welcome to Your Expense Dashboard</h2>
        <p>
          Track your daily expenses efficiently. Monitor total spending, highest categories, and monthly expenses at a glance.
        </p>
      </div>

      {/* ===================== DASHBOARD CARDS ===================== */}
      <div className="dashboard-cards">
        <div className="card">
          <h4>Total Expenses</h4>
          <p>{totalExpenses.toLocaleString()}</p>
        </div>

        <div className="card">
          <h4>Total Spent</h4>
          <p>₹{totalSpent.toLocaleString()}</p>
        </div>

        <div className="card">
          <h4>Highest Category</h4>
          <p>{highestCategory}</p>
        </div>

        <div className="card">
          <h4>This Month</h4>
          <p>₹{currentMonthSpent.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
