'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  const { publicKey, connected, connecting } = useWallet();

  if (connecting) {
    return (
      <button className="px-6 py-3 rounded-lg font-medium bg-dark-muted text-gray-400 cursor-wait border border-dark-border">
        Connecting...
      </button>
    );
  }

  return (
    <WalletMultiButton 
      className="!bg-gradient-to-r !from-gold-400 !to-amber-600 !text-black !font-semibold !rounded-lg !py-3 !px-6 !h-auto !border-0 hover:!opacity-90 !transition-all !duration-300 !shadow-lg !shadow-gold-500/30" 
    />
  );
}
