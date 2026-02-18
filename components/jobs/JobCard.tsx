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
  const tier = getTierFromScore(job.minReputation);

  return (
    <div
      onClick={hasAccess ? onClick : undefined}
      className={`transition-all duration-300 ${
        hasAccess
          ? 'cursor-pointer group'
          : 'opacity-60 pointer-events-none'
      }`}
    >
      <div className={`card card-hover h-full ${!hasAccess ? 'border-red-500/20' : ''}`}>
        {/* Category Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className="tier-badge tier-gold text-xs">
            {job.category}
          </span>
          {!hasAccess && (
            <span className="text-red-400 text-xs font-semibold bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
              🔒 Minimum Score: {job.minReputation}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold mb-3 text-white group-hover:text-gradient-gold transition-colors line-clamp-2">
          {job.title}
        </h3>

        {/* Budget - USDC */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-gray-400 text-sm">Budget:</span>
          <span className="text-gradient-gold font-serif text-2xl font-bold">
            {job.budget.toLocaleString()} USDC
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-xs bg-dark-muted text-gray-300 px-3 py-1.5 rounded-full hover:bg-gold-500/10 hover:text-gold-300 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-dark-border">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${hasAccess ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span className={`text-xs font-medium ${hasAccess ? 'text-emerald-400' : 'text-red-400'}`}>
              {hasAccess ? 'Unlocked' : 'Locked'}
            </span>
          </div>
          <span className={`tier-badge tier-${tier} text-xs`}>
            {getTierLabel(tier)}
          </span>
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          {hasAccess ? (
            <button className="w-full btn-primary text-sm font-semibold">
              Apply Now →
            </button>
          ) : (
            <button className="w-full py-3 rounded-lg border border-dark-border text-gray-500 cursor-not-allowed text-sm font-medium bg-dark-muted">
              🔒 Connect & Earn Score
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
