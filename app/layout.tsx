import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Drive Cameroun — Service de Chauffeur de Luxe",
  description:
    "Transferts aéroportuaires haut de gamme et service de chauffeur de luxe au Cameroun. Disponible à Douala et Yaoundé 24h/24 et 7j/7.",
  keywords: "chauffeur, luxe, transfert, aéroport, Cameroun, Douala, Yaoundé",
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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
