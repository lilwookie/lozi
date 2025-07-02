import { Geist, Geist_Mono, Radio_Canada_Big, Quicksand  } from "next/font/google";
import "./globals.css";


const radioCanada = Radio_Canada_Big({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-radio'
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tenanz Houses",
  description: "Tenant managemnt webb app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${radioCanada.variable} ${geistSans.variable} ${geistMono.variable} ${quicksand.variable}`}>
        {children}
      </body>
    </html>
  );
}
