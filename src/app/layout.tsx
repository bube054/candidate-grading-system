import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { UIStoreProvider } from "@/providers/ui-providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Result Management System",
  description: "Nigerian correctional services result management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-`}
      >
        <UIStoreProvider>{children}</UIStoreProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
