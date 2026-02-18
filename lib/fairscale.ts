import { FairScaleScore } from './types';

const FAIRSCALE_API_URL = process.env.NEXT_PUBLIC_FAIRSCALE_API || 'https://api2.fairscale.xyz';
const FAIRSCALE_API_KEY = process.env.NEXT_PUBLIC_FAIRSCALE_KEY || '';

export async function fetchReputationScore(walletAddress: string): Promise<FairScaleScore> {
  try {
    const response = await fetch(`${FAIRSCALE_API_URL}/score?wallet=${walletAddress}`, {
      headers: {
        'fairkey': FAIRSCALE_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch score: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      score: data.score || 0,
      tier: data.tier || calculateTier(data.score || 0),
      transactions: data.transactions || 0,
      volume: data.volume || 0,
      age: data.age || 0,
      verified: data.verified || false,
    };
  } catch (error) {
    console.error('Error fetching FairScale score:', error);
    // Fallback to mock if API fails
    const mockScore = Math.floor(Math.random() * 100);
    return {
      score: mockScore,
      tier: calculateTier(mockScore),
      transactions: 0,
      volume: 0,
      age: 0,
      verified: false,
    };
  }
}

function calculateTier(score: number): FairScaleScore['tier'] {
  if (score >= 90) return 'diamond';
  if (score >= 75) return 'platinum';
  if (score >= 60) return 'gold';
  if (score >= 40) return 'silver';
  if (score >= 20) return 'bronze';
  return 'none';
}

export function canAccessJob(userScore: number, minRequired: number): boolean {
  return userScore >= minRequired;
}

export function getTierColor(tier: FairScaleScore['tier']): string {
  const colors = {
    diamond: 'bg-cyan-400',
    platinum: 'bg-gray-300',
    gold: 'bg-yellow-400',
    silver: 'bg-gray-400',
    bronze: 'bg-amber-600',
    none: 'bg-gray-500',
  };
  return colors[tier] || colors.none;
}

export function getTierLabel(tier: FairScaleScore['tier']): string {
  const labels = {
    diamond: '💎 Diamond',
    platinum: '🥈 Platinum',
    gold: '🥇 Gold',
    silver: '🥈 Silver',
    bronze: '🥉 Bronze',
    none: '⚪ No Tier',
  };
  return labels[tier] || labels.none;
}
