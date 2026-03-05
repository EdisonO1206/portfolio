import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthProviders from "./providers/AuthProvider";

import Navbar from "./src/components/templates/Navbar";
import Footer from "./src/components/templates/Footer";
import BeforeLoadUser from "./routes/BeforeLoadUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edison Orozco Dev",
  description: "Edison Orozco d0eveloper portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProviders>
          <BeforeLoadUser>
            <Navbar></Navbar>
                <main className="p-10">{children}</main>
            <Footer></Footer>
          </BeforeLoadUser>
        </AuthProviders>
      </body>
    </html>
  );
}
