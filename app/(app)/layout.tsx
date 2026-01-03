import ChatProvider from "@/context/ChatProvider";
import { getUserAction } from "@/actions/getUserAction";

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUserAction();

    return (
        <ChatProvider initialUser={user}>
            {children}
        </ChatProvider>
    );
}
