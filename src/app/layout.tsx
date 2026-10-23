import type { Metadata } from "next";
import "./globals.css";
import { Ticker } from "@/components/layout/ticker";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingContact } from "@/components/layout/floating-contact";

export const metadata: Metadata = {
  title: "Subscriptions BD | Premium Digital Products in Bangladesh",
  description:
    "Buy ChatGPT Plus, YouTube Premium, Canva, Windows keys and OTT subscriptions securely with bKash, Nagad, Rocket and cards.",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#031711] text-[#f0fdf4] selection:bg-[#16a34a] selection:text-white font-sans">
        <Ticker />
        <Header />
        <main className="min-h-[calc(100vh-180px)]">{children}</main>
        <CartDrawer />
        <FloatingContact />
        <Footer />
      </body>
    </html>
  );
}
