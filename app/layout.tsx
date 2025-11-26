import type { Metadata } from "next";
import "./globals.css";
import ChatProvider from "@/context/ChatProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import GetLogdinUser from "@/components/GetLogdinUser";

export const metadata: Metadata = {
  title: "World Chat",
  description: "Chat with people from all over the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased `}
      >
        <ChatProvider>
          <SidebarProvider>
            {children}
            <GetLogdinUser />
          </SidebarProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
