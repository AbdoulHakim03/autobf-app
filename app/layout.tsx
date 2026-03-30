import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoBF — Auto Best Found",
  description: "Le premier marketplace automobile sécurisé du Burkina Faso. Vendeurs vérifiés, paiement escrow, historique VIN.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "AutoBF — Auto Best Found",
    description: "Achetez et vendez des voitures en toute confiance au Burkina Faso. Vendeurs vérifiés, paiement escrow sécurisé.",
    url: "https://autobf.africa",
    siteName: "AutoBF",
    images: [
      {
        url: "https://autobf.africa/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoBF — Marketplace Automobile du Burkina Faso",
      }
    ],
    locale: "fr_BF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoBF — Auto Best Found",
    description: "Le premier marketplace automobile sécurisé du Burkina Faso.",
    images: ["https://autobf.africa/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
