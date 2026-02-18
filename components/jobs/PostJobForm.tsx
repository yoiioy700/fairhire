'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface PostJobFormProps {
  onSubmit: (jobData: {
    title: string;
    description: string;
    budget: number;
    minReputation: number;
    category: string;
    skills: string[];
    status: 'open';
  }) => void;
}

export default function PostJobForm({ onSubmit }: PostJobFormProps) {
  const { publicKey } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: 1,
    minReputation: 20,
    category: 'Development',
    skills: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) return;

    onSubmit({
      title: formData.title,
      description: formData.description,
      budget: formData.budget,
      minReputation: formData.minReputation,
      category: formData.category,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      status: 'open',
    });

    setIsOpen(false);
    setFormData({
      title: '',
      description: '',
      budget: 1,
      minReputation: 20,
      category: 'Development',
      skills: '',
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        + Post a New Job
      </button>
    );
  }

  return (
    <div className="card mb-6">
      <h3 className="text-xl font-bold mb-4">Post a New Job</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            placeholder="e.g., Build a Solana dApp"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 h-32 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Describe the job requirements..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Budget (SOL)</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Min Reputation</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.minReputation}
              onChange={(e) => setFormData({ ...formData, minReputation: parseInt(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            >
              <option>Development</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Writing</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              placeholder="React, Solana, Rust"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex-1">
            Post Job
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
