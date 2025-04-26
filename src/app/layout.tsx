import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rabeez Riaz",
  description: "Personal Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className="min-h-full min-w-full overflow-hidden antialiased"
        data-theme="mocha"
      >
        {children}
      </body>
    </html>
  );
}
