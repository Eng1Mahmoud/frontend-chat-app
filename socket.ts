"use client";
import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {

    withCredentials: true,
    timeout: 15000, // tighter initial connect timeout
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
});

