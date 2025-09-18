import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Providers from "@/components/Providers";
import Navbar from "@/components/shared/Navbar";
import { authOptions } from "@/utils/authOptions";
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Dashboard",
  description: "Mini Dashboard with Next.js, Tailwind CSS, and Framer Motion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar session={session} />
          <main className="mx-auto max-w-5xl px-4 py-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
