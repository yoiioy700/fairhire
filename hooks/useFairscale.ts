'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { FairScaleScore } from '@/lib/types';
import { fetchReputationScore } from '@/lib/fairscale';

export function useFairscale() {
  const { publicKey } = useWallet();
  const [score, setScore] = useState<FairScaleScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = useCallback(async () => {
    if (!publicKey) {
      setScore(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const walletAddress = publicKey.toString();
      const scoreData = await fetchReputationScore(walletAddress);
      setScore(scoreData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch score');
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  return {
    score,
    loading,
    error,
    refreshScore: fetchScore,
  };
}
