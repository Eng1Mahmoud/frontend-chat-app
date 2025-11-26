"use client";
import { useEffect } from "react";
import { socket } from "@/socket";
import { useChat } from "@/context/ChatProvider";

const SocketController = () => {
    const { setOnlineUsers } = useChat() || {};

    useEffect(() => {
        if (!setOnlineUsers) return;

        socket.connect();

        const onOnlineUsers = (userIds: string[]) => {
            setOnlineUsers(new Set(userIds));
        };

        const onUserOnline = (userId: string) => {
            setOnlineUsers((prev) => {
                const newSet = new Set(prev);
                newSet.add(userId);
                return newSet;
            });
        };

        const onUserOffline = (userId: string) => {
            // update online users
            setOnlineUsers((prev) => {
                const newSet = new Set(prev);
                newSet.delete(userId);
                return newSet;
            });
            // update user data to see last seen


        };
        socket.on("online_users", onOnlineUsers);
        socket.on("user_online", onUserOnline);
        socket.on("user_offline", onUserOffline);

        return () => {
            socket.off("online_users", onOnlineUsers);
            socket.off("user_online", onUserOnline);
            socket.off("user_offline", onUserOffline);
            socket.disconnect();
        };
    }, [setOnlineUsers]);

    return null;
};

export default SocketController;
