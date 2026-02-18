'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { FairScaleScore } from '@/lib/types';

interface ReputationBadgeProps {
  score: FairScaleScore | null;
  loading?: boolean;
}

export default function ReputationBadge({ score, loading }: ReputationBadgeProps) {
  const { connected } = useWallet();

  if (!connected) {
    return null; // Don't show badge when not connected
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 card py-2 px-4">
        <div className="w-20 h-4 bg-dark-muted rounded animate-pulse" />
      </div>
    );
  }

  if (!score) {
    return (
      <div className="flex items-center gap-2 card py-2 px-4 border-gray-600">
        <span className="text-gray-400 text-sm">No Score</span>
      </div>
    );
  }

  const tierClasses: Record<string, string> = {
    diamond: 'border-cyan-400/30 text-cyan-400',
    platinum: 'border-slate-300/30 text-slate-300',
    gold: 'border-gold-400/30 text-gold-400',
    silver: 'border-gray-300/30 text-gray-300',
    bronze: 'border-amber-600/30 text-amber-500',
    none: 'border-gray-600/30 text-gray-500',
  };

  return (
    <div className={`flex items-center gap-3 card py-2 px-4 border ${tierClasses[score.tier]}`}>
      <div className="text-right">
        <div className="text-xs text-gray-400 uppercase tracking-wider">Reputation</div>
        <div className="font-serif text-lg font-bold">{score.score}</div>
      </div>
    </div>
  );
}
