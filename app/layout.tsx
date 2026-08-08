
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://carrierfirst.com'),
  title: {
    default: 'Carrier First Management | Freight Brokerage & Load Board Platform',
    template: '%s | Carrier First Management',
  },
  description: 'Carrier First Management connects carriers, brokers, and shippers with the most efficient freight matching platform in North America. Find loads, book instantly, and manage your fleet with real-time analytics.',
  keywords: ['freight brokerage', 'load board', 'trucking', 'carrier', 'shipper', 'logistics', 'freight matching', 'truck loads', 'dispatch'],
  authors: [{ name: 'Carrier First Management' }],
  creator: 'Carrier First Management',
  publisher: 'Carrier First Management',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://carrierfirst.com',
    siteName: 'Carrier First Management',
    title: 'Carrier First Management | Freight Brokerage & Load Board Platform',
    description: 'The freight matching platform built for modern carriers and brokers. Real-time loads, instant booking, and fleet analytics.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Carrier First Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carrier First Management | Freight Brokerage Platform',
    description: 'Find loads, book instantly, manage your fleet. Built for carriers and brokers who move North America.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Carrier First Management',
              url: 'https://carrierfirst.com',
              logo: 'https://carrierfirst.com/logo.png',
              sameAs: [
                'https://linkedin.com/company/carrierfirst',
                'https://twitter.com/carrierfirst',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-800-555-0199',
                contactType: 'customer service',
                areaServed: 'US',
                availableLanguage: 'English',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased bg-white text-gray-900`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}