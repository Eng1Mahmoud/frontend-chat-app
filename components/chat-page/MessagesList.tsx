"use client";
import { IMessage, Iuser } from "@/types/apiFetch";
import { Check, CheckCheck } from "lucide-react";
import { RefObject } from "react";
import { useChat } from "@/context/ChatProvider";
import { getInitials } from "../Avatar";
import { generateAvatarColor } from "@/utils/generateAvatarColor";
interface MessagesListProps {
    messages: IMessage[];
    messagesEndRef: RefObject<HTMLDivElement | null>;
    isTyping: boolean;
}
const UserAvatar = ({ user }: { user: Iuser }) => {
    return (
        <div className="w-12 h-12 rounded-full 
                                      flex items-center justify-center text-white font-semibold text-sm
                                      shadow-lg ring-2 ring-white/20" style={{ backgroundColor: generateAvatarColor(user?.username as string) }} >
            {getInitials(user?.username as string)}
        </div>
    )
}
const MessagesList = ({ messages, messagesEndRef, isTyping }: MessagesListProps) => {
    const { logedinUser, selectedUserForChat } = useChat() || {};
    console.log(messages);
    return (
        <>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex gap-1.5 ${msg.sender === logedinUser?._id ? "justify-end" : "justify-start"}`}

                >
                    {/* sender avatar */}
                    {msg.sender !== logedinUser?._id && (
                        <UserAvatar user={selectedUserForChat as Iuser} />
                    )
                    }
                    <div
                        className={`max-w-[75%] md:max-w-[60%] p-4 rounded-4xl shadow-sm relative group transition-all duration-200 ${msg.sender === logedinUser?._id
                            ? "bg-linear-to-br from-indigo-600 to-purple-600 text-white  rounded-tr-none"
                            : "bg-slate-800/80 backdrop-blur-sm border border-white/5 text-gray-100  rounded-tl-none"
                            }`}
                    >
                        <p className="text-[15px] leading-relaxed mb-1.5">{msg.text}</p>
                        <div className={`flex items-center gap-1.5 text-[11px] ${msg.sender === logedinUser?._id ? "justify-end text-indigo-100/70" : "justify-start text-slate-400"
                            }`}>
                            <span>
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {msg.sender === logedinUser?._id && (
                                <span className="ml-0.5">
                                    {msg.status === "read" ? (
                                        <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
                                    ) : msg.status === "delivered" ? (
                                        <CheckCheck className="w-3.5 h-3.5 text-indigo-200/70" />
                                    ) : (
                                        <Check className="w-3.5 h-3.5 text-indigo-200/70" />
                                    )}
                                </span>
                            )}
                        </div>

                    </div>
                    {/* receiver avatar */}
                    {msg.sender == logedinUser?._id && (
                        <UserAvatar user={logedinUser as Iuser} />
                    )}
                </div>
            ))}

            {isTyping && (
                <div className="flex gap-3">
                    <UserAvatar user={selectedUserForChat as Iuser} />
                    <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                </div>
            )}

            <div ref={messagesEndRef} />
        </>
    );
};

export default MessagesList;
