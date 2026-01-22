import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import DashboardComponent from "../components/Dashboard";
import './Dashboard.css'

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosInstance.get("/expenses");
        setExpenses(res.data.expenses || []);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  /* REAL VALUES */
  const totalExpenses = expenses.length;

  const totalSpent = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + Number(e.amount);
  });

  const highestCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.entries(categoryTotals).reduce((a, b) =>
          b[1] > a[1] ? b : a
        )[0]
      : "—";

  const currentMonthSpent = expenses
    .filter((e) => {
      const d = new Date(e.expenseDate);
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  if (loading) return <p>Loading...</p>;

  return (
    <DashboardComponent
      totalExpenses={totalExpenses}
      totalSpent={totalSpent}
      highestCategory={highestCategory}
      currentMonthSpent={currentMonthSpent}
    />
  );
};

export default DashboardPage;
