import type { Metadata } from "next";
// import "./globals.css"; // (abaikan jika tidak ada)

export const metadata: Metadata = {
  title: "WOWO Portfolio",
  description: "Portofolio WOWO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* TAMBAHKAN SCRIPT INI UNTUK MENGHAPUS BADGE NETLIFY */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const removeNetlifyBadge = () => {
                const badge = document.getElementById('netlify-badge-frame');
                if (badge) {
                  badge.style.display = 'none';
                  badge.remove();
                }
              };
              
              // Jalankan saat halaman dimuat
              document.addEventListener('DOMContentLoaded', removeNetlifyBadge);
              
              // Jalankan juga setelah beberapa saat untuk berjaga-jaga (karena iframe dimuat belakangan)
              setTimeout(removeNetlifyBadge, 1000);
              setTimeout(removeNetlifyBadge, 3000);
            `,
          }}
        />
        
        {children}
      </body>
    </html>
  );
}
