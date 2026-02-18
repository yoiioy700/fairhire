'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const WalletContextProvider = dynamic(
  () => import('./wallet/WalletContextProvider'),
  { ssr: false }
);

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}
