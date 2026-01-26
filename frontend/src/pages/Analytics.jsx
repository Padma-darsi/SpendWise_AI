import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";
import "./analytics.css";
import { predictBudget } from "../api/aiApi";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444", "#14b8a6"];

export default function Analytics() {
  const [expenses, setExpenses] = useState([]); // ✅ MUST be array
  const [loading, setLoading] = useState(true);
  const [aiData, setAiData] = useState(null);
  const [aiError, setAiError] = useState(null);


  useEffect(() => {
    fetchExpenses();
  }, []);


useEffect(() => {
  predictBudget()
    .then(data => setAiData(data))
    .catch(() => setAiError("AI prediction unavailable"));
}, []);




  const fetchExpenses = async () => {
    try {
      const res = await axiosInstance.get("/expenses");

      /*
        BACKEND RESPONSE:
        {
          count: number,
          expenses: [...]
        }
      */

      setExpenses(Array.isArray(res.data.expenses) ? res.data.expenses : []);
    } catch (err) {
      console.error("Analytics fetch failed", err);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="analytics-loading">Loading analytics...</p>;
  }

  /* ================= REAL CALCULATIONS ================= */

  const totalExpenses = expenses.length;

  const totalSpent = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  /* ===== CATEGORY ===== */
  const categoryMap = {};
  expenses.forEach((exp) => {
    if (!exp.category) return;
    categoryMap[exp.category] =
      (categoryMap[exp.category] || 0) + Number(exp.amount || 0);
  });

  const categoryData = Object.entries(categoryMap).map(
    ([name, value]) => ({ name, value })
  );

  const highestCategory =
    categoryData.length > 0
      ? categoryData.reduce((a, b) => (b.value > a.value ? b : a)).name
      : "—";

  /* ===== MONTHLY ===== */
  const monthMap = {};
  expenses.forEach((exp) => {
    if (!exp.expenseDate) return;

    const month = new Date(exp.expenseDate).toLocaleString("default", {
      month: "short",
      year: "numeric"
    });

    monthMap[month] =
      (monthMap[month] || 0) + Number(exp.amount || 0);
  });

  const monthlyData = Object.entries(monthMap).map(
    ([month, amount]) => ({ month, amount })
  );



  /* ================= UI ================= */

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Analytics Dashboard</h2>

      {/* ===== TOP CARDS ===== */}
      <div className="analytics-cards">
        <div className="analytics-card">
          <h4>Total Expenses</h4>
          <p>{totalExpenses}</p>
        </div>

        <div className="analytics-card">
          <h4>Total Spent</h4>
          <p>₹{totalSpent}</p>
        </div>

        <div className="analytics-card">
          <h4>Highest Category</h4>
          <p>{highestCategory}</p>
        </div>
      </div>

      {/* ===== CATEGORY PIE ===== */}
      <div className="analytics-section">
        <h3>Category-wise Spending</h3>

        {categoryData.length === 0 ? (
          <p className="no-data">No category data</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ===== MONTHLY BAR ===== */}
      <div className="analytics-section">
        <h3>Monthly Spending</h3>

        {monthlyData.length === 0 ? (
          <p className="no-data">No monthly data</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>


      {aiData && (
  <div className="ai-card">
    <h3>AI Budget Prediction</h3>
    <p>Predicted Next Month Expense: ₹{aiData.predictedExpense}</p>
    <p>Recommended Budget: ₹{aiData.recommendedBudget}</p>
  </div>
)}

{aiError && <p className="no-data">{aiError}</p>}

    </div>
  );
}
