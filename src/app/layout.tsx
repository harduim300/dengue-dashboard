import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Monitor da Dengue",
  description: "Fique por dentro das últimas atualizações sobre a situação da Dengue em diversas regiões com o Monitor da Dengue. Acompanhe em tempo real os números de casos, médias de risco e a porcentagem de cidades em alerta.",
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/512/1905/1905225.png"
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
