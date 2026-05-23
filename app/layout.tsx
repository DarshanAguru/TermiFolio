import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profileData } from "@/data/profileData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: profileData.title || profileData.name,
  description: `${profileData.name} - ${profileData.roles.join(", ")}. Personal portfolio showcasing projects, professional work experience, skills, and certifications.`,
  openGraph: {
    title: `${profileData.title || profileData.name}: Portfolio`,
    description: `${profileData.name} - ${profileData.roles.join(", ")}. Personal portfolio showcasing projects, professional work experience, skills, and certifications.`,
    url: "https://github.com",
    siteName: `${profileData.title || profileData.name}: Portfolio`,
    images: [
      { url: "/opengraph-image.png", alt: `${profileData.name}'s Portfolio Website` }
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      </head>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
