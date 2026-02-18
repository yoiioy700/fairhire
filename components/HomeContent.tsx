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

function truncateAddress(address: string) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function HomeContent() {
  const { connected, publicKey } = useWallet();
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
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-300 to-amber-600 rounded-xl flex items-center justify-center text-black font-bold text-2xl shadow-lg shadow-gold-500/30">
                F
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-gradient-gold">FairGig</h1>
                <p className="text-xs text-gray-400 font-medium tracking-wider">REPUTATION-GATED FREELANCE</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {connected && score && (
                <div className="hidden md:flex items-center gap-2 card py-2 px-4">
                  <span className="text-gray-400 text-sm">Score:</span>
                  <span className="text-gradient-gold font-bold text-lg">{score.score}</span>
                  <span className={`tier-badge tier-${score.tier}`}>{score.tier}</span>
                </div>
              )}
              {connected && publicKey && (
                <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm font-mono">
                  {truncateAddress(publicKey.toString())}
                </div>
              )}
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
            <div className="card card-hover text-center py-16 mb-12 mt-8">
              <h2 className="font-serif text-5xl font-bold mb-6 text-gradient-gold">Welcome to FairGig</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                The first freelance marketplace gated by FairScale reputation score. 
                <span className="text-gold-300">Higher score = access to premium jobs.</span>
              </p>
              <div className="flex flex-col items-center gap-4">
                <WalletButton />
                <p className="text-gray-500 text-sm">Connect with Phantom, Solflare, or Backpack</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="card card-hover text-center py-8">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-serif font-bold text-xl mb-3 text-gold-300">Reputation Gated</h3>
                <p className="text-sm text-gray-400">Access jobs based on your FairScale score. Higher reputation unlocks exclusive opportunities.</p>
              </div>
              <div className="card card-hover text-center py-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-serif font-bold text-xl mb-3 text-gold-300">Instant USDC</h3>
                <p className="text-sm text-gray-400">Direct USDC payments on Solana. No delays, no holdups, just instant settlement.</p>
              </div>
              <div className="card card-hover text-center py-8">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-serif font-bold text-xl mb-3 text-gold-300">Verified Talent</h3>
                <p className="text-sm text-gray-400">On-chain reputation ensures quality. Every freelancer is verified and scored.</p>
              </div>
            </div>

            {/* Preview Message */}
            <div className="card card-hover mb-8 border-gold-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gradient-gold mb-1">Preview Available Jobs</h2>
                  <p className="text-gray-400 text-sm">Connect your wallet to apply • Higher FairScale score unlocks premium opportunities</p>
                </div>
                <div className="text-gold-300 text-4xl">👇</div>
              </div>
            </div>

            <JobList
              jobs={jobs.slice(0, 6)}
              userScore={0}
              onJobClick={setSelectedJob}
              loading={jobsLoading}
            />

            {selectedJob && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="card max-w-lg w-full p-8 border-gold-400/30">
                  <h3 className="font-serif text-2xl font-bold text-gradient-gold mb-4">{selectedJob.title}</h3>
                  <div className="flex gap-3 text-sm mb-4">
                    <span className="tier-badge tier-gold">{selectedJob.category}</span>
                    <span className="tier-badge tier-none">Min Score: {selectedJob.minReputation}</span>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">{selectedJob.description}</p>
                  <div className="flex items-center gap-2 mb-6 text-sm">
                    <span className="text-gray-400">Budget:</span>
                    <span className="text-gradient-gold font-bold text-xl">{selectedJob.budget.toLocaleString()} USDC</span>
                  </div>
                  <div className="flex gap-3">
                    <WalletButton />
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="px-6 py-3 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors text-sm"
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
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">{jobs.filter(j => userScore >= j.minReputation).length} jobs unlocked for you</p>
                <h2 className="font-serif text-3xl font-bold text-gradient-gold">Available Jobs</h2>
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
        {selectedJob && connected && (
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
      <footer className="border-t border-dark-border mt-20 py-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Built for <span className="text-gold-400">FairScale Fairathon</span> • Powered by <span className="text-gold-400">Solana Mainnet</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
