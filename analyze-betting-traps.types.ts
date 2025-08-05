// src/ai/flows/analyze-betting-traps.types.ts
import { z } from 'zod';

export const AnalyzeBettingTrapsInputSchema = z.object({
  gameDetails: z.string().describe("Game matchup with teams, time, and venue"),
  probablePitchers: z.string().describe("Starting pitcher stats and matchup data"),
  liveOdds: z.string().describe("Current betting lines including moneyline, run line, and totals"),
  weather: z.string().describe("Weather conditions including wind speed/direction, temperature, humidity"),
  injuries: z.string().describe("Key player injury reports and their impact"),
  bullpenData: z.string().describe("Bullpen usage, ERA, and availability for both teams"),
  keyBatterStats: z.string().describe("Key hitter performance vs opposing pitcher types"),
  // Additional fields for more precise analysis
  teamRecords: z.string().optional().describe("Current season records and recent form"),
  parkFactors: z.string().optional().describe("Stadium characteristics affecting scoring"),
  lineMovement: z.string().optional().describe("How the betting line has moved since opening"),
  publicBettingPercentage: z.string().optional().describe("Percentage of public money on each side"),
  sharpAction: z.string().optional().describe("Indicators of professional betting activity"),
});

export const AnalyzeBettingTrapsOutputSchema = z.object({
  isTrap: z.boolean().describe("Whether this game presents a trap betting opportunity"),
  confidence: z.number().min(0).max(100).describe("Confidence level in the analysis (0-100)"),
  recommendation: z.enum(['AVOID', 'FADE_PUBLIC', 'TAKE_VALUE', 'NO_ACTION']).describe("Betting recommendation"),
  trapSide: z.enum(['HOME', 'AWAY', 'OVER', 'UNDER', 'NONE']).optional().describe("Which side appears to be the trap"),
  valueSide: z.enum(['HOME', 'AWAY', 'OVER', 'UNDER', 'NONE']).optional().describe("Which side offers better value"),
  summary: z.string().describe("Detailed explanation of the analysis and reasoning"),
  keyFactors: z.array(z.string()).describe("List of the most important factors in the analysis"),
  suggestedBet: z.string().optional().describe("Specific betting suggestion if value is identified"),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe("Risk assessment for the suggested play"),
});

export type AnalyzeBettingTrapsInput = z.infer<typeof AnalyzeBettingTrapsInputSchema>;
export type AnalyzeBettingTrapsOutput = z.infer<typeof AnalyzeBettingTrapsOutputSchema>;
