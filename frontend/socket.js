import { io } from "socket.io-client";

export const socket = io(
  "https://nell-interapophysal-noncommemoratively.ngrok-free.dev",
  {
    //http://localhost:5173
    autoConnect: false,
  },
);
