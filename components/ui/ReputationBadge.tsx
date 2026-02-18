'use client';

import React from 'react';
import { FairScaleScore } from '@/lib/types';
import { getTierColor, getTierLabel } from '@/lib/fairscale';

interface ReputationBadgeProps {
  score: FairScaleScore | null;
  loading?: boolean;
}

export default function ReputationBadge({ score, loading }: ReputationBadgeProps) {
  if (loading) {
    return (
      <div className="animate-pulse flex items-center gap-2 bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2">
        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  if (!score) {
    return (
      <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2">
        <span className="text-gray-500">Connect wallet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${getTierColor(score.tier)} text-white rounded-full px-4 py-2 flex items-center gap-2`}
      >
        <span className="font-bold">{score.score}</span>
        <span className="text-sm">{getTierLabel(score.tier)}</span>
      </div>
    </div>
  );
}
