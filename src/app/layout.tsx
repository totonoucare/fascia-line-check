import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "つっぱりラインチェック for Clinic",
  description: "治療院HPに埋め込める予約前からだチェックツール"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
