import ChatProvider from "@/context/ChatProvider";
import GetLogdinUser from "@/components/GetLogdinUser";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ChatProvider>
            {children}
            <GetLogdinUser />
        </ChatProvider>
    );
}
