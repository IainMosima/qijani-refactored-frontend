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
  description: "Grocery ecommerce platform that delivers meal plan packages to households doorstep.  We strive to make your shopping and cooking lifestyle easier and healthier",
  manifest: './manifest.webmanifest',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className='lg:w-[92%] w-[100%] px-2 mx-auto overflow-x-hidden'>
            {children}
          </div>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}