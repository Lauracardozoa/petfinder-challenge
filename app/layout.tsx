import Link from "next/link";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PetFinder Challenge",
  description: "A simple app to find pets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="mb-4 py-8 px-16 font-bold text-3xl bg-purple-700 text-white">
          <Link href="/">
            <h1>🐾🔍 PetFinder Challenge</h1>
          </Link>
        </header>
        <main className="mx-16">{children}</main>
        <footer className="mt-4 py-4 text-center bg-purple-300 text-gray-900">
          Developed by Laura Cardozo Albornoz
        </footer>
      </body>
    </html>
  );
}
