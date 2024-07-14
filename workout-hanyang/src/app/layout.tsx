import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workout Hanyang - 운동 기록 앱",
  description: "한양대학교 학생들을 위한 운동 기록 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Workout Hanyang</h1>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-200 text-center p-4">
          <p>&copy; 2024 Workout Hanyang. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}