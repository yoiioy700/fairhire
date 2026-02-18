'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';

export default function WalletButton() {
  const { publicKey, connected, connecting } = useWallet();

  const formatAddress = (key: PublicKey) => {
    const address = key.toString();
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (connecting) {
    return (
      <button className="btn-primary opacity-75 cursor-wait">
        Connecting...
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {connected && publicKey && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {formatAddress(publicKey)}
        </span>
      )}
      <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-lg !font-semibold !py-2 !px-4 !h-auto" />
    </div>
  );
}
