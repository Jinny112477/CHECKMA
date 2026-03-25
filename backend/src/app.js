import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../frontend/dist");

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ API มาก่อน
app.use("/api/users", usersRoutes);

// ✅ FIX: manifest ต้องมาก่อน static
app.get("/manifest.webmanifest", (req, res) => {
  res.sendFile(path.join(frontendPath, "manifest.webmanifest"));
});

// ✅ Static frontend
app.use(express.static(frontendPath));

// ✅ Catch-all (ต้องอยู่ล่างสุด)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

export default app;
