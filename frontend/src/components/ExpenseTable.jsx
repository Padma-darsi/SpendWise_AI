export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <table className="expense-table">
      <thead>
        <tr>
  <th>Title</th>
  <th>Category</th>
  <th>Amount</th>
  <th>Date</th>
  <th>Actions</th>
</tr>

      </thead>

      <tbody>
        {expenses.length === 0 ? (
          <tr>
            <td colSpan="5">No expenses found</td>
          </tr>
        ) : (
          expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.note}</td>
              <td>{exp.category}</td>
              <td>₹{exp.amount}</td>
              <td>{new Date(exp.expenseDate).toLocaleDateString()}</td>

              <td>
                <button onClick={() => onEdit(exp)}>Edit</button>
                <button onClick={() => onDelete(exp._id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}




