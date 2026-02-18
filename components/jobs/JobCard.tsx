'use client';

import React from 'react';
import { Job } from '@/lib/types';
import { canAccessJob, getTierLabel } from '@/lib/fairscale';

interface JobCardProps {
  job: Job;
  userScore: number;
  onClick: () => void;
}

function getTierFromScore(score: number) {
  if (score >= 90) return 'diamond';
  if (score >= 75) return 'platinum';
  if (score >= 60) return 'gold';
  if (score >= 40) return 'silver';
  if (score >= 20) return 'bronze';
  return 'none';
}

export default function JobCard({ job, userScore, onClick }: JobCardProps) {
  const hasAccess = canAccessJob(userScore, job.minReputation);
  
  return (
    <div
      onClick={hasAccess ? onClick : undefined}
      className={`card transition-all duration-200 ${
        hasAccess ? 'hover:shadow-xl cursor-pointer' : 'opacity-50 pointer-events-none grayscale'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {job.category}
          </span>
          <h3 className="text-xl font-bold mt-1">{job.title}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-600">
            {job.budget} SOL
          </p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Min Score:</span>
          <span
            className={`text-sm font-semibold px-2 py-1 rounded ${
              hasAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {job.minReputation}+ ({getTierLabel(getTierFromScore(job.minReputation))})
          </span>
        </div>
        <div>
          {hasAccess ? (
            <span className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">View Details →</span>
          ) : (
            <span className="bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed text-sm flex items-center gap-1">
              🔒 Locked
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
