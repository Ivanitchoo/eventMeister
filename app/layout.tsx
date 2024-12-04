import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  variable: "--font-poppins",
  weight: ['400', '500', '600', '700']
});


export const metadata: Metadata = {
  title: "guinxaPass",
  description: "Guinnxa is a platform for event management",
  icons: { icon: '/assets/images/logo.svg' }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={poppins.variable}> {children}  </body>
      </html>
    </ClerkProvider>
  );
}
