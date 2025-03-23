import type { Metadata } from "next";
import { Prompt, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { WishlistProvider } from "@/lib/wishlist-context";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Krixies Shop - Women's Fashion Clothing",
  description: "Premium quality women's clothing brand since 2007",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${prompt.variable} ${montserrat.variable} font-prompt`}>
        <WishlistProvider>
          <Toaster />
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
