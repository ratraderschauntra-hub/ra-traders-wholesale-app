import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RA Traders | Wholesale App',
  description: 'Wholesale supply ordering and inventory dashboard for RA Traders.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
