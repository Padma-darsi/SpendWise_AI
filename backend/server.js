import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import connectMongoDB from "./config/mongo.connection.js";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    "https://spend-wise-ai-frontend.vercel.app",
    "https://spend-wise-ai-frontend-j47gbl56m-padmas-projects-4d33d517.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());

/* ---------- DATABASE CONNECTION ---------- */
connectMongoDB();

/* ---------- BASE ROUTE ---------- */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "SpendWise AI Backend is running 🚀"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/expense", expenseRoutes);




/* ---------- SERVER START ---------- */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
