import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Rabeez Riaz",
  description: "Personal Homepage for experienced Data Scientist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className="fluid h-full min-h-full w-full min-w-full antialiased"
        data-theme="mocha"
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-7Z1XKEP3JP" />
    </html>
  );
}
