import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ClientProviders from "@/components/ClientProviders";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sartawi Properties. Discover Your Dream Property",
  description: "Find premium real estate properties in Dubai with Sartawi. Trust. Resilience. Ambition.",
  icons: {
    icon: "/logos/sartavilogo.svg",
    apple: "/logos/sartavilogo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} antialiased font-sans bg-black text-white`}
      >
        <ClientProviders>
          <div className="flex flex-col min-h-screen bg-black">
            <Navbar />
            <main className="flex-grow relative">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
