'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import semua wallet-related components
const HomeContent = dynamic(
  () => import('@/components/HomeContent'),
  { ssr: false, loading: () => <div className="min-h-screen bg-dark-bg flex items-center justify-center"><div className="text-gold-300 text-xl">Loading FairGig...</div></div> }
);

export default function Home() {
  return <HomeContent />;
}
