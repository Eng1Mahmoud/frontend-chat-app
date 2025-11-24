"use client";
import { io } from "socket.io-client";

<<<<<<< HEAD
export const socket = io(process.env.NEXT_PUBLIC_API_URL, {
=======
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
>>>>>>> feature/online-status-improvements
  withCredentials: true,
  autoConnect: false,
});

