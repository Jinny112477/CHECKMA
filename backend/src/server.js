import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";

import { Server } from "socket.io";
import http from "http";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const server = http.createServer(app);

// WEBSOCKET
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://checkma-inky.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
});

app.options("*", cors());

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend + Socket.IO running on port ${PORT}`);
});

export { io };
