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

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.114:5173", //IPv4 ของเครื่องตัวเอง (ดูใน cmd ด้วยคำสั่ง ipconfig)
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend + Socket.IO running on port ${PORT}`);
});
