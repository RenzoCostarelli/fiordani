import type { Metadata } from "next";
import { Barlow, Montserrat, Gloock } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SmoothScrolling from "@/components/SmoothScrolling";
import Footer from "@/components/Footer";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Fiordani Renzi S.A.",
  description: "Fiordani Renzi Cereales S.A. - Gödeken - Santa Fe - Argentina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${barlow.variable} ${montserrat.variable} ${gloock.variable} antialiased bg-white`}
      >
        <SmoothScrolling />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
