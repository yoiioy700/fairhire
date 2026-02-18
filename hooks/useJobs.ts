'use client';

import { useState, useEffect, useCallback } from 'react';
import { Job, FairScaleScore } from '@/lib/types';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: '🚀 Build Solana dApp Frontend',
    description: 'Need a React developer to build a Solana wallet integration for our NFT marketplace. Experience with Anchor framework preferred. Remote friendly.',
    budget: 5000,
    minReputation: 40,
    creator: '7xK9...3mP2',
    creatorScore: { score: 75, tier: 'platinum', transactions: 50, volume: 1000, age: 365, verified: true },
    status: 'open',
    category: 'Development',
    skills: ['React', 'Solana', 'TypeScript', 'Anchor'],
    createdAt: Date.now() - 86400000,
  },
  {
    id: '2',
    title: '🔒 Smart Contract Security Audit',
    description: 'Looking for security expert to audit our new DeFi protocol. Must have prior audit experience and published reports.',
    budget: 10000,
    minReputation: 80,
    creator: '3aB9...8kL1',
    creatorScore: { score: 90, tier: 'diamond', transactions: 200, volume: 5000, age: 730, verified: true },
    status: 'open',
    category: 'Security',
    skills: ['Rust', 'Security', 'Anchor', 'Auditing'],
    createdAt: Date.now() - 172800000,
  },
  {
    id: '3',
    title: '🎨 Logo & Brand Identity Design',
    description: 'Need a modern logo for our new DeFi platform. Open to creative concepts. Include brand guidelines.',
    budget: 1500,
    minReputation: 20,
    creator: '9xC4...7jM2',
    creatorScore: { score: 35, tier: 'silver', transactions: 10, volume: 100, age: 180, verified: false },
    status: 'open',
    category: 'Design',
    skills: ['Logo Design', 'Branding', 'Figma'],
    createdAt: Date.now() - 259200000,
  },
  {
    id: '4',
    title: '📝 Technical Documentation Writer',
    description: 'Write comprehensive docs for our SDK. API references, tutorials, and code examples needed.',
    budget: 2000,
    minReputation: 30,
    creator: '2bD8...5hK9',
    creatorScore: { score: 45, tier: 'gold', transactions: 20, volume: 300, age: 240, verified: true },
    status: 'open',
    category: 'Content',
    skills: ['Technical Writing', 'Documentation', 'Markdown'],
    createdAt: Date.now() - 432000000,
  },
  {
    id: '5',
    title: '📱 Mobile App Developer (React Native)',
    description: 'Build cross-platform mobile app for our DeFi dashboard. iOS/Android with Solana mobile adapter.',
    budget: 8000,
    minReputation: 60,
    creator: '5fE1...9gL3',
    creatorScore: { score: 65, tier: 'gold', transactions: 40, volume: 800, age: 320, verified: true },
    status: 'open',
    category: 'Development',
    skills: ['React Native', 'Solana Mobile', 'iOS', 'Android'],
    createdAt: Date.now() - 518400000,
  },
  {
    id: '6',
    title: '🎬 Explainer Video Production',
    description: '2-minute animated video explaining our protocol. Professional quality with voiceover.',
    budget: 3000,
    minReputation: 50,
    creator: '8hG4...2kM7',
    creatorScore: { score: 55, tier: 'gold', transactions: 30, volume: 600, age: 280, verified: true },
    status: 'open',
    category: 'Video',
    skills: ['Animation', 'Motion Graphics', 'Video Editing'],
    createdAt: Date.now() - 604800000,
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
