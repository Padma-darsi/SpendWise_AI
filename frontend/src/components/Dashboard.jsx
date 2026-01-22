const Dashboard = ({
  totalExpenses,
  totalSpent,
  highestCategory,
  currentMonthSpent
}) => {
  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h4>Total Expenses</h4>
          <p>{totalExpenses}</p>
        </div>

        <div className="card">
          <h4>Total Spent</h4>
          <p>₹{totalSpent}</p>
        </div>

        <div className="card">
          <h4>Highest Category</h4>
          <p>{highestCategory}</p>
        </div>

        <div className="card">
          <h4>This Month</h4>
          <p>₹{currentMonthSpent}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


