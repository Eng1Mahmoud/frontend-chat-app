import { useState, useRef, useEffect } from "react";
import { IMessage } from "@/types/apiFetch";

export const useChatScroll = (messages: IMessage[], selectedUserForChat: any) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

    // Scroll to bottom when chat is first opened
    useEffect(() => {
        if (selectedUserForChat && messagesEndRef.current) {
            // Use setTimeout to ensure messages are rendered first
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
            }, 100);
        }
    }, [selectedUserForChat]);

    // Auto-scroll when new messages arrive (only if user is near bottom)
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Show scroll button when user is not at the bottom of the chat
    const handleScroll = () => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + 200;
            setShowScrollToBottomButton(!isAtBottom);
        }
    };

    // Scroll to bottom when user clicks on scroll button
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return {
        messagesEndRef,
        messagesContainerRef,
        showScrollToBottomButton,
        handleScroll,
        scrollToBottom,
    };
};
