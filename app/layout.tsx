import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Drive Cameroun — Luxury Chauffeur Service",
  description:
    "Premium airport transfers and luxury chauffeur service in Cameroon. Available in Douala and Yaoundé 24/7.",
  keywords: "chauffeur, luxury, transfer, airport, Cameroon, Douala, Yaoundé",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
