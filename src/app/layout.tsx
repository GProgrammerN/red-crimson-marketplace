import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { PageTransition } from "@/components/layout/page-transition";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Red Crimson Marketplace",
    template: "%s — Red Crimson Marketplace",
  },
  description:
    "Descubra uma curadoria exclusiva de produtos vermelhos, dos tons mais sutis aos mais intensos.",
  keywords: ["marketplace", "produtos vermelhos", "red crimson", "e-commerce"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <PageTransition>{children}</PageTransition>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
