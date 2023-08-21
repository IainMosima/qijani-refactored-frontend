import Footer from "@/components/Footer/Footer";
import BottomNav from "@/components/Bottomnav/Bottomnav";
import { Navbar } from "@/components";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qijani",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className='lg:w-[92%] w-[100%] px-2 mx-auto overflow-x-hidden h-full'>
            {children}
          </div>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}