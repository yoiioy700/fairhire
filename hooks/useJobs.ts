'use client';

import { useState, useEffect, useCallback } from 'react';
import { Job, FairScaleScore } from '@/lib/types';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Build Solana dApp Frontend',
    description: 'Need a React developer to build a Solana wallet integration for our NFT marketplace. Experience with Anchor framework preferred.',
    budget: 5,
    minReputation: 40,
    creator: 'ABC123...XYZ',
    creatorScore: { score: 75, tier: 'platinum', transactions: 50, volume: 1000, age: 365, verified: true },
    status: 'open',
    category: 'Development',
    skills: ['React', 'Solana', 'TypeScript'],
    createdAt: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Smart Contract Audit',
    description: 'Looking for security expert to audit our new DeFi protocol. Must have prior audit experience.',
    budget: 10,
    minReputation: 80,
    creator: 'DEF456...UVW',
    creatorScore: { score: 90, tier: 'diamond', transactions: 200, volume: 5000, age: 730, verified: true },
    status: 'open',
    category: 'Development',
    skills: ['Rust', 'Security', 'Anchor'],
    createdAt: Date.now() - 172800000,
  },
  {
    id: '3',
    title: 'Logo Design for Web3 Startup',
    description: 'Need a modern logo for our new DeFi platform. Open to creative concepts.',
    budget: 2,
    minReputation: 20,
    creator: 'GHI789...RST',
    creatorScore: { score: 35, tier: 'silver', transactions: 10, volume: 100, age: 180, verified: false },
    status: 'open',
    category: 'Design',
    skills: ['Logo Design', 'Branding'],
    createdAt: Date.now() - 259200000,
  },
];

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setJobs(MOCK_JOBS);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const postJob = useCallback(async (jobData: Omit<Job, 'id' | 'creator' | 'creatorScore' | 'createdAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      creator: 'CURRENT_WALLET',
      creatorScore: { score: 50, tier: 'gold', transactions: 25, volume: 500, age: 180, verified: true },
      createdAt: Date.now(),
    };

    setJobs(prev => [newJob, ...prev]);
    return newJob;
  }, []);

  const applyToJob = useCallback(async (jobId: string, proposal: string, price: number) => {
    console.log('Applied to job:', { jobId, proposal, price });
    return true;
  }, []);

  return {
    jobs,
    loading,
    fetchJobs,
    postJob,
    applyToJob,
  };
}
