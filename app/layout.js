import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo",
  description: "Todo Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-sky-900 ${inter.className}`}>{children}</body>
    </html>
  );
}
