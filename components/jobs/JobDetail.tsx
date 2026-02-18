'use client';

import React from 'react';
import { Job } from '@/lib/types';
import { canAccessJob } from '@/lib/fairscale';

interface JobDetailProps {
  job: Job;
  userScore: number;
  onApply: () => void;
  onClose: () => void;
}

export default function JobDetail({ job, userScore, onApply, onClose }: JobDetailProps) {
  const hasAccess = canAccessJob(userScore, job.minReputation);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase">
              {job.category}
            </span>
            <h2 className="text-2xl font-bold mt-2">{job.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex-1">
            <p className="text-sm text-gray-500">Budget</p>
            <p className="text-xl font-bold text-emerald-600">{job.budget} SOL</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Min Reputation</p>
            <p className="text-lg font-semibold">{job.minReputation}+</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Posted</p>
            <p className="text-lg">{new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {job.description}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {hasAccess ? (
            <button
              onClick={onApply}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex-1"
            >
              Apply for This Job
            </button>
          ) : (
            <div className="flex-1">
              <button disabled className="bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-lg w-full flex items-center justify-center gap-2 cursor-not-allowed">
                🔒 Your Reputation Too Low
              </button>
              <p className="text-center text-sm text-red-500 mt-2">
                Need {job.minReputation - userScore} more points
              </p>
            </div>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
