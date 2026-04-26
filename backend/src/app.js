import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

// Routes import
import participantsRoutes from "./routes/participant.routes.js";
import usersRoutes from "./routes/users.routes.js";
import classroomRoutes from "./routes/classroom.routes.js";
import classSessionRoutes from "./routes/classSession.routes.js";
import signalRoutes from "./routes/signal.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";

const app = express();

// Middleware: CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://checkma-inky.vercel.app"],
    credentials: true,
  }),
);

const allowedOrigins = [
  "http://localhost:5173",
  "https://checkma-inky.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// 👇 IMPORTANT for preflight
app.options(/.*/, cors(corsOptions));

// Body parser : File limitation
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//  API ROUTES
app.use("/api/users", usersRoutes);
app.use("/api/sessions", classroomRoutes);
app.use("/api/classes", classSessionRoutes);
app.use("/api/participants", participantsRoutes);
app.use("/api/attendance", signalRoutes);
app.use("/api/attend", attendanceRoutes);

export default app;
