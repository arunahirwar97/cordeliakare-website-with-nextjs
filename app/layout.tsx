import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";
import Script from "next/script";
import ScrollToTop from "@/components/ScrollTop";
import { MVTProvider } from "@/context/MVT_Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cordeliakare - Hospital Information Management System",
  icons: {
    icon: "/favicon1.png",
  },
  description:
    "Transforming Healthcare with Innovation. Complete digital health ecosystem bringing hospitals and patients together.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <UserProvider>
            <MVTProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {/* Place Toaster here, inside ThemeProvider but outside other components */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    className: "",
                    style: {
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid hsl(var(--border))",
                    },
                  }}
                />

                <Navbar />
                <main className="min-h-screen pt-16 pb-8">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
                    <Script
                      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                      strategy="beforeInteractive"
                    />
                    <ScrollToTop />
                    {children}
                  </div>
                </main>
                <Footer />
              </ThemeProvider>
            </MVTProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}