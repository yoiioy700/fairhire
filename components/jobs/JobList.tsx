'use client';

import React from 'react';
import { Job } from '@/lib/types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  userScore: number;
  onJobClick: (job: Job) => void;
  loading?: boolean;
}

export default function JobList({ jobs, userScore, onJobClick, loading }: JobListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card h-80 animate-pulse bg-dark-muted" />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="card text-center py-16">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="font-serif text-2xl font-bold mb-2">No Jobs Found</h3>
        <p className="text-gray-400 mb-6">Be the first to post a job opportunity</p>
      </div>
    );
  }

  // Sort: unlocked first, then by tier
  const sortedJobs = [...jobs].sort((a, b) => {
    const aUnlocked = userScore >= a.minReputation;
    const bUnlocked = userScore >= b.minReputation;
    if (aUnlocked && !bUnlocked) return -1;
    if (!aUnlocked && bUnlocked) return 1;
    return b.minReputation - a.minReputation;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          userScore={userScore}
          onClick={() => onJobClick(job)}
        />
      ))}
    </div>
  );
}
