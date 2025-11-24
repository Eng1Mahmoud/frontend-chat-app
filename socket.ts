"use client";
import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
  // Prefer websocket, fallback to polling
  transports: ['websocket', 'polling'],
  // Reconnection settings
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  // Timeout settings to match backend
  timeout: 20000,
});

