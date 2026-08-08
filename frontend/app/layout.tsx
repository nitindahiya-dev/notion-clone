import type { Metadata } from "next";
import "./globals.css";

import {
  AuthProvider,
} from "@/components/providers/auth-provider";

export const metadata: Metadata = {
  title: "Notion Clone",
  description:
    "A production-grade collaborative workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}