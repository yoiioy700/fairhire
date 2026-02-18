'use client';

import React, { useState } from 'react';
import { Job } from '@/lib/types';

interface ApplyModalProps {
  job: Job;
  onSubmit: (proposal: string, price: number) => void;
  onClose: () => void;
}

export default function ApplyModal({ job, onSubmit, onClose }: ApplyModalProps) {
  const [proposal, setProposal] = useState('');
  const [price, setPrice] = useState(job.budget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(proposal, price);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-lg w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">Apply: {job.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600">Budget: <span className="font-bold">{job.budget} SOL</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Proposal</label>
            <textarea
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 h-32 dark:bg-gray-800"
              placeholder="Describe why you're the best fit..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Price (SOL)</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max={job.budget}
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex-1">
              Submit Application
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
