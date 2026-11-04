import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Apple devices render SF Pro via -apple-system; Inter is the closest fallback elsewhere.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Caballero — Desarrollador fullstack",
  description:
    "Desarrollador fullstack en Córdoba. .NET, Angular, Flutter y software que se usa todos los días en negocios de toda la provincia.",
  openGraph: {
    title: "Juan Caballero — Desarrollador fullstack",
    description:
      "Desarrollador fullstack en Córdoba. .NET, Angular, Flutter y software que se usa todos los días.",
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
