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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FairGig</h1>
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
          <>
            {/* Hero Section */}
            <div className="card text-center py-12 mb-8">
              <h2 className="text-3xl font-bold mb-4">Welcome to FairGig</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                The first freelance marketplace gated by FairScale reputation score. 
                Higher score = access to premium jobs.
              </p>
              <div className="flex justify-center gap-4">
                <WalletButton />
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="card text-center py-6">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-bold mb-2">Reputation Gated</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Jobs locked by FairScale score</p>
              </div>
              <div className="card text-center py-6">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold mb-2">Instant Payment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Direct USDC on Solana</p>
              </div>
              <div className="card text-center py-6">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-bold mb-2">Verified Talent</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">On-chain reputation</p>
              </div>
            </div>

            {/* Sample Jobs Preview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Sample Jobs</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect wallet to apply • Higher FairScale score unlocks more jobs
              </p>
            </div>

            <JobList
              jobs={jobs.slice(0, 3)}
              userScore={0}
              onJobClick={setSelectedJob}
              loading={jobsLoading}
            />

            {selectedJob && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6">
                  <h3 className="text-xl font-bold mb-2">{selectedJob.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedJob.description}</p>
                  <div className="flex gap-4 text-sm mb-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                      Min Score: {selectedJob.minReputation}
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                      ${selectedJob.budget}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <WalletButton />
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
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