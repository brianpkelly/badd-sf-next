import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import BootstrapClient from "../components/BootstrapClient/BootstrapClient.js";
import ApolloWrapper from "./apollo-provider.tsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | BADD',
    default: 'Recovery Advocacy for Mental Health Support & Justice | BADD',
  },
  description: 'BADD Is A Recovery Advocacy For Mental Health Support Nonprofit Serving Underserved Communities. Join Us In Creating Real Change.',
  metadataBase: new URL('https://www.badd-sf.org'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    images: '/badd-assets/graphics/og-image.png',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-PVVF6V7X" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVVF6V7X"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>

        <BootstrapClient />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
