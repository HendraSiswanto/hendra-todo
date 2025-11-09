import type { Metadata } from "next";
import { Roboto,Inter,Rubik } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});


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
      <body className={`${roboto.variable}  ${inter.variable} ${rubik.variable} min-h-screen antialiased`}>
        <div className="min-h-screen bg-white">{children}</div>
      </body>
    </html>
  );
}
