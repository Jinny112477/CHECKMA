import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes import
import usersRoutes from "./routes/users.routes.js";
import classroomRoutes from "./routes/classroom.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../frontend/dist");

// Middleware: CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// Body parser : File limitation
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//  API ROUTES
app.use("/api/users", usersRoutes);
app.use("/api", classroomRoutes);

app.get("/manifest.webmanifest", (req, res) => {
  res.sendFile(path.join(frontendPath, "manifest.webmanifest"));
});

// Static frontend
app.use(express.static(frontendPath));

// Catch-all
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

export default app;
