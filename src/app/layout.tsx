import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CartDrawer from "@/components/cart/cart-drawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qelvoryn | Premium Jewelry & Cosmetics",
  description: "Discover our premium collection of elegant jewelry and luxurious cosmetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <div className="app-wrapper">
            <AnnouncementBar />
            <Navbar />
            <CartDrawer />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
