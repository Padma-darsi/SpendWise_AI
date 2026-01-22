import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    note: {
      type: String
    },
    expenseDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("SW_Expense", expenseSchema);
