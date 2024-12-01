import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  variable: "--font-poppins",
  weight: ['400', '500', '600', '700']
});


export const metadata: Metadata = {
  title: "nkuvuPass",
  description: "Nkuvu is a platform for event management",
  icons: { icon: '\assets\images\logo.svg' }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.variable}
      >
        {children}
      </body>
    </html>
  );
}
