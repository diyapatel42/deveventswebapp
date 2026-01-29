import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "Developer Events",
    description: "List of all developer events meant to help mentor and network",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" >

        <Navbar/>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
        >
        {/* --- GLOBAL AURORA ENGINE --- */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Main Glow Blobs - Enhanced with more colors and movement */}
            <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] rounded-full aurora-blob-primary opacity-[0.4] blur-[80px] animate-aurora" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] rounded-full aurora-blob-tertiary opacity-[0.4] blur-[80px] [animation:aurora-move-2_18s_ease-in-out_infinite]" />
            <div className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[70%] h-[70%] rounded-full aurora-blob-secondary opacity-[0.25] blur-[90px] [animation:aurora-move-3_20s_ease-in-out_infinite]" />
            <div className="absolute top-[50%] right-[10%] w-[60%] h-[60%] rounded-full aurora-blob-accent opacity-[0.3] blur-[70px] [animation:aurora-move-4_22s_ease-in-out_infinite]" />

            {/* Texture Overlay (The Secret Sauce) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>
        </div>

        {/* --- PAGE CONTENT --- */}
        <main className="relative z-10">
            {children}
        </main>
        </body>
        </html>
    );
}