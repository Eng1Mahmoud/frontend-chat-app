"use client";
import { useEffect } from "react";
import { socket } from "@/socket";
import { useChat } from "@/context/ChatProvider";

const SocketController = () => {
    const { setOnlineUsers } = useChat() || {};

    useEffect(() => {
        if (!setOnlineUsers) return;

        socket.connect();

        const onConnect = () => {
            console.log("Connected to socket");
        };

        const onDisconnect = () => {
            console.log("Disconnected from socket");
            // Don't clear online users on disconnect - they will be updated via user_offline events
        };

        const onOnlineUsers = (userIds: string[]) => {
            console.log('Received online_users:', userIds);
            setOnlineUsers(new Set(userIds));
        };

        const onUserOnline = (userId: string) => {
            console.log('Received user_online:', userId);
            setOnlineUsers((prev) => {
                const newSet = new Set(prev);
                newSet.add(userId);
                return newSet;
            });
        };

        const onUserOffline = (userId: string) => {
            console.log('Received user_offline:', userId);
            setOnlineUsers((prev) => {
                const newSet = new Set(prev);
                newSet.delete(userId);
                return newSet;
            });
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("connect_error", (err) => {
            console.log("Socket connection error:", err.message);
        });
        socket.on("online_users", onOnlineUsers);
        socket.on("user_online", onUserOnline);
        socket.on("user_offline", onUserOffline);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("online_users", onOnlineUsers);
            socket.off("user_online", onUserOnline);
            socket.off("user_offline", onUserOffline);
            socket.disconnect();
        };
    }, [setOnlineUsers]);

    return null;
};

export default SocketController;
