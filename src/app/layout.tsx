import type { Metadata } from "next";
import "./globals.css";

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
    </html>
  );
}
