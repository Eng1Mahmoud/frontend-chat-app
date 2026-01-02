import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] }); // only latin characters

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
        {children}
      </body>
    </html>
  );
}
