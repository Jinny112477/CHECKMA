import { io } from "socket.io-client";

export const socket = io("http://192.168.1.114:5000", { //IPv4 ของเครื่องตัวเอง (ดูใน cmd ด้วยคำสั่ง ipconfig)
    autoConnect: false,
});