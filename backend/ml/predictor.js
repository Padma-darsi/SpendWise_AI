import * as tf from "@tensorflow/tfjs";
import { createExpenseModel } from "./expense.model.js";

export const predictNextMonthExpense = async (monthlyTotals) => {
  const months = monthlyTotals.map((_, index) => index + 1);
  const expenses = monthlyTotals;

  const xs = tf.tensor2d(months, [months.length, 1]);
  const ys = tf.tensor2d(expenses, [expenses.length, 1]);

  const model = createExpenseModel();

  await model.fit(xs, ys, {
    epochs: 200,
    verbose: 0
  });

  const nextMonth = tf.tensor2d(
    [months.length + 1],
    [1, 1]
  );

  const prediction = model.predict(nextMonth);

  return prediction.dataSync()[0];
};
