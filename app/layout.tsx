import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const dynamic = 'force-dynamic'; // ← CRUCIAL : relit le cookie à chaque requête

export const metadata: Metadata = {
  title: "Royal Drive Cameroun — Service de Chauffeur de Luxe",
  description: "Transferts aéroportuaires haut de gamme au Cameroun.",
  keywords: "chauffeur, luxe, transfert, aéroport, Cameroun, Douala, Yaoundé",
  icons: { icon: "/images/logo.png" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  console.log("🌍 Locale active:", locale); // retirez après test

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Désactive Google Translate — évite l'erreur insertBefore */}
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}