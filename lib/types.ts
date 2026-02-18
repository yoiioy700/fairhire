export interface FairScaleScore {
  score: number;
  tier: 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'none';
  transactions: number;
  volume: number;
  age: number;
  verified: boolean;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  minReputation: number;
  creator: string;
  creatorScore: FairScaleScore;
  status: 'open' | 'in_progress' | 'completed';
  category: string;
  skills: string[];
  createdAt: number;
}

export interface JobApplication {
  applicant: string;
  proposal: string;
  price: number;
  timestamp: number;
}
