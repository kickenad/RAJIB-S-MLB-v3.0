// src/ai/flows/signal-analysis.types.ts
import { z } from 'genkit';

// Market Types
export const MarketType = z.enum([
  // Match Markets (6)
  'MATCH_WINNER',
  'MATCH_SINGLES', 
  'MATCH_HOME_RUNS',
  'MATCH_STRIKEOUTS',
  'MATCH_TOTAL_BASES',
  'MATCH_DOUBLES',
  
  // Team Markets (5)
  'TEAM_SINGLES',
  'TEAM_DOUBLES', 
  'TEAM_STOLEN_BASES',
  'TEAM_RBI',
  'TEAM_HITS',
  
  // Player Markets (7)
  'PLAYER_HIT',
  'PLAYER_RBI',
  'PLAYER_SINGLE',
  'PLAYER_RUN',
  'PLAYER_HOME_RUN',
  'PLAYER_TOTAL_BASES',
  'PLAYER_HITS_RUNS_RBIS'
]);

export const SignalStrength = z.enum(['WEAK', 'MODERATE', 'STRONG', 'VERY_STRONG']);
export const SignalDirection = z.enum(['OVER', 'UNDER', 'YES', 'NO', 'HOME', 'AWAY']);

export const MarketSignal = z.object({
  market: MarketType,
  direction: SignalDirection,
  strength: SignalStrength,
  confidence: z.number().min(0).max(100),
  value: z.number().optional(), // The line/number we're betting
  reasoning: z.string(),
  keyFactors: z.array(z.string()),
  expectedValue: z.number().optional(), // Expected value calculation
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  unitSize: z.number().min(0.5).max(5), // Betting unit size (0.5-5 units)
});

export const SignalAnalysisInputSchema = z.object({
  gameDetails: z.string(),
  trapAnalysis: z.object({
    isTrap: z.boolean(),
    trapSide: z.string().optional(),
    valueSide: z.string().optional(),
    confidence: z.number(),
  }),
  matchData: z.object({
    probablePitchers: z.string(),
    pitcherStats: z.string(),
    teamStats: z.string(),
    h2hHistory: z.string(),
    parkFactors: z.string(),
  }),
  teamData: z.object({
    homeTeamStats: z.string(),
    awayTeamStats: z.string(),
    recentForm: z.string(),
    bullpenStatus: z.string(),
    injuries: z.string(),
  }),
  playerData: z.object({
    keyPlayers: z.string(),
    lineups: z.string(),
    playerVsPitcher: z.string(),
    playerForm: z.string(),
    playerProps: z.string(), // Available player prop odds
  }),
  marketOdds: z.object({
    matchMarkets: z.string(),
    teamMarkets: z.string(), 
    playerMarkets: z.string(),
  }),
  weather: z.string(),
  umpireData: z.string().optional(),
});

export const SignalAnalysisOutputSchema = z.object({
  gameId: z.string(),
  analysisTimestamp: z.string(),
  signals: z.array(MarketSignal),
  topPicks: z.array(MarketSignal).max(5), // Top 5 recommended bets
  avoidBets: z.array(z.object({
    market: MarketType,
    reason: z.string(),
  })),
  overallConfidence: z.number().min(0).max(100),
  recommendedBankroll: z.number().min(0).max(100), // Percentage of bankroll to use
  summary: z.string(),
  riskAssessment: z.string(),
});

export type SignalAnalysisInput = z.infer<typeof SignalAnalysisInputSchema>;
export type SignalAnalysisOutput = z.infer<typeof SignalAnalysisOutputSchema>;
export type MarketSignalType = z.infer<typeof MarketSignal>;