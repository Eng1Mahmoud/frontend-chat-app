"use client";
import { useEffect } from "react";
import { socket } from "@/socket";
import { useChat } from "@/context/ChatProvider";

const SocketController = () => {
  const { setOnlineUsers, setUnreadCounts } = useChat() || {};

  useEffect(() => {
    if (!setOnlineUsers || !setUnreadCounts) return;

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

    const onUnreadCounts = (counts: Record<string, number>) => {
      setUnreadCounts(counts);
    };

    const onUnreadCountUpdate = ({
      senderId,
      count,
    }: {
      senderId: string;
      count: number;
    }) => {
      setUnreadCounts((prev) => ({
        ...prev,
        [senderId]: count,
      }));
    };

    socket.on("online_users", onOnlineUsers);
    socket.on("user_online", onUserOnline);
    socket.on("user_offline", onUserOffline);
    socket.on("unread_counts", onUnreadCounts);
    socket.on("unread_count_update", onUnreadCountUpdate);

    return () => {
      socket.off("online_users", onOnlineUsers);
      socket.off("user_online", onUserOnline);
      socket.off("user_offline", onUserOffline);
      socket.off("unread_counts", onUnreadCounts);
      socket.off("unread_count_update", onUnreadCountUpdate);
      socket.disconnect();
    };
  }, [setOnlineUsers, setUnreadCounts]);

  return null;
};

export default SocketController;
