import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://192.168.1.114:5173" //IPv4 ของเครื่องตัวเอง (ดูใน cmd ด้วยคำสั่ง ipconfig)
  ],
  credentials: true
}));

// Image size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/users", usersRoutes);

export default app;
