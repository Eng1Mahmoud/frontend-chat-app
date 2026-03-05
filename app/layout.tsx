import type { Metadata } from "next";
import { Inter, /* Cairo */ } from "next/font/google";
import "./globals.css";
const inter = Inter(
  {
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",

  }
); // only latin characters
/* const cairo = Cairo(
  {
    subsets: ["arabic"],
    weight: ["400"],
    variable: "--font-cairo",

  }
); */ // only arabic characters

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
    <html lang="en" className={`${inter.variable}  antialiased `}>
      <body>
        {children}
      </body>
    </html>
  );
}
