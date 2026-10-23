import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
// import "./globals.css"; // Hapus komentar ini jika Anda menggunakan Tailwind/CSS Global

// Setup Google Font (Plus Jakarta Sans sebagai pengganti PP Formula)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Farid Ardiansyah Portfolio",
  description: "Portofolio Farid Ardiansyah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Terapkan class font ke body */}
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
