import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] }); // only latin characters
import ChatProvider from "@/context/ChatProvider";
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
      <body className={`${inter.className} antialiased `}>
        <ChatProvider>
          {children}
          <GetLogdinUser />
        </ChatProvider>
      </body>
    </html>
  );
}
