'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useFairscale } from '@/hooks/useFairscale';
import { useJobs } from '@/hooks/useJobs';
import WalletButton from '@/components/wallet/WalletButton';
import ReputationBadge from '@/components/ui/ReputationBadge';
import JobList from '@/components/jobs/JobList';
import JobDetail from '@/components/jobs/JobDetail';
import PostJobForm from '@/components/jobs/PostJobForm';
import ApplyModal from '@/components/jobs/ApplyModal';
import { Job } from '@/lib/types';

export default function Home() {
  const { connected } = useWallet();
  const { score, loading: scoreLoading } = useFairscale();
  const { jobs, loading: jobsLoading, postJob, applyToJob } = useJobs();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);

  const handlePostJob = async (jobData: Parameters<typeof postJob>[0]) => {
    const newJob = await postJob(jobData);
    if (newJob) {
      alert('Job posted successfully!');
    }
  };

  const handleApply = async (proposal: string, price: number) => {
    if (applyingJob) {
      await applyToJob(applyingJob.id, proposal, price);
      alert('Application submitted!');
      setApplyingJob(null);
    }
  };

  const userScore = score?.score || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                F
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FairHire</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Reputation-Gated Freelance Marketplace</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ReputationBadge score={score} loading={scoreLoading} />
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!connected ? (
          <div className="card text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Welcome to FairHire</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect your Solana wallet to browse jobs gated by FairScale reputation score
            </p>
            <WalletButton />
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Available Jobs</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {score ? `Your score: ${score.score} | ${jobs.filter(j => userScore >= j.minReputation).length} jobs unlocked` : 'Loading...'}
                </p>
              </div>
              <PostJobForm onSubmit={handlePostJob} />
            </div>

            <JobList
              jobs={jobs}
              userScore={userScore}
              onJobClick={setSelectedJob}
              loading={jobsLoading}
            />
          </>
        )}

        {/* Job Detail Modal */}
        {selectedJob && (
          <JobDetail
            job={selectedJob}
            userScore={userScore}
            onApply={() => {
              setApplyingJob(selectedJob);
              setSelectedJob(null);
            }}
            onClose={() => setSelectedJob(null)}
          />
        )}

        {/* Apply Modal */}
        {applyingJob && (
          <ApplyModal
            job={applyingJob}
            onSubmit={handleApply}
            onClose={() => setApplyingJob(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
          <p>Built for FairScale Fairathon • Powered by Solana Devnet</p>
        </div>
      </footer>
    </div>
  );
}