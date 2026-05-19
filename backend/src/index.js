require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { pool } = require("./db");
const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

app.use("/api/products", productsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Внутренняя ошибка сервера" });
});

app.listen(PORT, () => {
  console.log(`API запущен: http://localhost:${PORT}`);
});
