import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "@/components/providers/modal-provider";
import AuthSessionProvider from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "Constant Manager",
  description: "Manage your constants effortlessly",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" storageKey="cstmgr-theme" enableSystem={false}>
          <AuthSessionProvider>
            <QueryProvider>
              {children}
              <ModalProvider />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryProvider>
          </AuthSessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
