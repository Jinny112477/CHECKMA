import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/users", usersRoutes);

export default app;
