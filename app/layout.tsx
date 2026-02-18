import type { Metadata } from 'next';
import './globals.css';
import WalletContextProvider from '@/components/wallet/WalletContextProvider';

export const metadata: Metadata = {
  title: 'FairGig - Reputation-Gated Freelance Marketplace',
  description: 'Freelance marketplace gated by FairScale reputation score',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-white antialiased">
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
