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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card h-64 bg-gray-200"></div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">No jobs found</p>
        <p className="text-gray-400 mt-2">Be the first to post a job!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
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
