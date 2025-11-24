"use client";
import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  withCredentials: true,
  // Match backend: try polling first, upgrade to WebSocket if available
  transports: ['polling', 'websocket'],
  // Connection and reconnection settings
  timeout: 15000,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: false,
});

