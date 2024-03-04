"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/context/ContextProvider";
import { KBCContextProvider } from "@/context/KBCContext";
import { SparkingBackground } from "@/components/sparking-bg";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <KBCContextProvider>
            <SparkingBackground>{children}</SparkingBackground>
          </KBCContextProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
