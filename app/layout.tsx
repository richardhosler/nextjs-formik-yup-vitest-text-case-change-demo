import type { Metadata } from "next";
import { JSX, ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Change Case App",
  description: "Change the case of your strings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className="antialiased text-gray-700 max-w-screen max-h-screen overflow-hidden">
        <div className="min-h-screen bg-purple-400 flex justify-center items-center">
          <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block" />
          <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block" />
          {children}
          <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block" />
          <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block" />
        </div>
      </body>
    </html>
  );
}
