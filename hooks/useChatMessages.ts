import { useEffect, useState } from "react";
import { useChat } from "@/context/ChatProvider";
import { socket } from "@/socket";
import { getMessagesAction } from "@/actions/messageActions";
import { IMessage } from "@/types/apiFetch";

export const useChatMessages = () => {
  const { selectedUserForChat, logedinUser } = useChat() || {};
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  useEffect(() => {
    if (!selectedUserForChat) return;

    const fetchMessages = async () => {
      try {
        const res = await getMessagesAction(selectedUserForChat?._id);
        if (res.success && res.data) {
          setMessages(res.data);
          // Mark messages as read when opening chat
          const unreadMessages = res.data.filter(
            (msg: IMessage) => msg.sender === selectedUserForChat._id && msg.status !== "read"
          );
          if (unreadMessages.length > 0) {
            socket.emit("mark_as_read", { senderId: selectedUserForChat._id });
            // Optimistically update local state
            setMessages((prev) =>
              prev.map((msg) =>
                msg.sender === selectedUserForChat._id ? { ...msg, status: "read" } : msg
              )
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();

    const onReceiveMessage = (message: IMessage) => {
      const isFromSelectedUser = message.sender === selectedUserForChat?._id;
      const isToSelectedUser = message.receiver === selectedUserForChat?._id;
      if (isFromSelectedUser || isToSelectedUser) {
        setMessages((prev) => [...prev, message]);

        // If the message is from the selected user, mark it as read immediately
        if (isFromSelectedUser) {
          socket.emit("mark_as_read", { senderId: selectedUserForChat._id });
        }
      }
    };

    const onUserTyping = (data: { userId: string }) => {
      if (data.userId === selectedUserForChat?._id) {
        setIsOtherUserTyping(true);
      }
    };

    const onUserStoppedTyping = (data: { userId: string }) => {
      if (data.userId === selectedUserForChat?._id) {
        setIsOtherUserTyping(false);
      }
    };

    const onMessagesReadUpdate = (data: { receiverId: string; status: string }) => {
      if (data.receiverId === selectedUserForChat?._id) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.receiver === selectedUserForChat._id ? { ...msg, status: "read" } : msg
          )
        );
      }
    };

    socket.on("receive_message", onReceiveMessage);
    socket.on("user_typing", onUserTyping);
    socket.on("user_stopped_typing", onUserStoppedTyping);
    socket.on("messages_read_update", onMessagesReadUpdate);

    return () => {
      socket.off("receive_message", onReceiveMessage);
      socket.off("user_typing", onUserTyping);
      socket.off("user_stopped_typing", onUserStoppedTyping);
      socket.off("messages_read_update", onMessagesReadUpdate);
      setMessages([]);
      setIsOtherUserTyping(false);
    };
  }, [selectedUserForChat, logedinUser]);

  return { messages, isOtherUserTyping };
};
