import { useEffect, useState } from "react";
import ExpenseTable from "../components/ExpenseTable";
import { getExpenses, addExpense, deleteExpense,updateExpense } from "../api/expenseApi";
import './Expenses.css'


export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEdit = (expense) => {
  setEditingId(expense._id);

  setForm({
    title: expense.note,
    category: expense.category,
    amount: expense.amount,
    date: expense.expenseDate.slice(0, 10)
  });
};
  

const handleDelete = async (id) => {
  if (!window.confirm("Delete this expense?")) return;

  try {
    await deleteExpense(id);
    fetchExpenses();
  } catch (err) {
    alert("Failed to delete expense");
  }
};


 const fetchExpenses = async () => {
  try {
    const res = await getExpenses();
    setExpenses(res.data.expenses || []);
  } catch (err) {
    console.error(err);
  }
};



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleAddExpense = async (e) => {
  e.preventDefault();

  const payload = {
    amount: Number(form.amount),
    category: form.category,
    note: form.title,
    expenseDate: form.date
  };

  try {
    if (editingId) {
      await updateExpense(editingId, payload);
      setEditingId(null);
    } else {
      await addExpense(payload);
    }

    setForm({ title: "", category: "", amount: "", date: "" });
    fetchExpenses();
  } catch (err) {
    alert("Operation failed");
  }
};




  return (
    <div className="expenses-page">
    
    {/* PAGE INTRO / AWARENESS */}
    <div className="expenses-intro">
      <h2>Expense Management</h2>
     
    </div>

    {/* ADD / EDIT FORM */}
    <div className="expense-card">
      <h3 className="section-title">
        {editingId ? "Edit Expense" : "Add New Expense"}
      </h3>

      <form className="expense-form" onSubmit={handleAddExpense}>
        <input
          name="title"
          placeholder="Expense Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>

    {/* TABLE */}
    <div className="expense-card">
      <h3 className="section-title">Expense History</h3>

      <ExpenseTable
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  </div>
);
}
