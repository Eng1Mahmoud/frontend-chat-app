import { useState, useRef, useEffect } from "react";
import { socket } from "@/socket";
import { useChat } from "@/context/ChatProvider";

export const useSendMessage = () => {
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { selectedUserForChat } = useChat() || {};

    // Cleanup timeout on unmount or when selected user changes
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            // Notify that user stopped typing when switching chats
            if (isTyping && selectedUserForChat) {
                socket.emit("user_stopped_typing", { receiverId: selectedUserForChat._id });
            }
        };
    }, [selectedUserForChat, isTyping]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setMessage(value);

        if (!selectedUserForChat) return;

        // If user is typing
        if (value.trim().length > 0) {
            // Emit typing event only if not already typing
            if (!isTyping) {
                setIsTyping(true);
                socket.emit("user_typing", { receiverId: selectedUserForChat._id });
            }

            // Clear previous timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            // Set timeout to stop typing after 2 seconds of inactivity
            typingTimeoutRef.current = setTimeout(() => {
                setIsTyping(false);
                socket.emit("user_stopped_typing", { receiverId: selectedUserForChat._id });
            }, 2000);
        } else {
            // If message is empty, stop typing immediately
            if (isTyping) {
                setIsTyping(false);
                socket.emit("user_stopped_typing", { receiverId: selectedUserForChat._id });
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };

    const handleSendMessage = () => {
        if (message.trim() && selectedUserForChat) {
            socket.emit("send_message", {
                receiverId: selectedUserForChat?._id,
                text: message,
            });
            setMessage("");
            // Focus on textarea after sending message
            textareaRef.current?.focus();
            // Stop typing when message is sent
            if (isTyping) {
                setIsTyping(false);
                socket.emit("user_stopped_typing", { receiverId: selectedUserForChat._id });
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return {
        message,
        textareaRef,
        handleInputChange,
        handleSendMessage,
        handleKeyPress,
    };
};
