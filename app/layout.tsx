import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    variable: "--font-roboto",
  subsets: ["latin"],
}) 

export const metadata: Metadata = {
  title: "Hendra Todo Nodewave",
  description: "Assesment for First Step",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
