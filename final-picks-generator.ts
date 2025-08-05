// src/ai/flows/final-picks-generator.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { type AnalyzeBettingTrapsOutput } from './analyze-betting-traps.types';
import { type SignalAnalysisOutput } from './signal-analysis.types';

const FinalPickInputSchema = z.object({
  gameDetails: z.string(),
  trapAnalysis: z.custom<AnalyzeBettingTrapsOutput>(),
  signalAnalysis: z.custom<SignalAnalysisOutput>(),
  bankrollManagement: z.object({
    totalBankroll: z.number(),
    maxRiskPerGame: z.number().max(20), // Max 20% per game
    currentExposure: z.number(),
  }),
  marketLimits: z.object({
    maxBetsPerGame: z.number().max(5),
    minConfidence: z.number().min(60),
    minExpectedValue: z.number(),
  }),
});

const FinalPickSchema = z.object({
  pickId: z.string(),
  market: z.string(),
  selection: z.string(),
  odds: z.number(),
  stake: z.number(), // In dollars
  unitSize: z.number(),
  confidence: z.number(),
  expectedValue: z.number(),
  reasoning: z.string(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  priority: z.enum(['LOCK', 'STRONG', 'VALUE', 'HEDGE']),
});

const FinalPicksOutputSchema = z.object({
  gameId: z.string(),
  picksTimestamp: z.string(),
  finalPicks: z.array(FinalPickSchema).max(5),
  totalStake: z.number(),
  totalUnits: z.number(),
  expectedROI: z.number(),
  riskScore: z.number().min(1).max(10),
  picksSummary: z.string(),
  bankrollUsage: z.number(), // Percentage of bankroll
  correlationWarnings: z.array(z.string()),
  alternativePicks: z.array(FinalPickSchema).max(3), // Backup options
});

export type FinalPicksInput = z.infer<typeof FinalPickInputSchema>;
export type FinalPicksOutput = z.infer<typeof FinalPicksOutputSchema>;
export type FinalPick = z.infer<typeof FinalPickSchema>;

export async function generateFinalPicks(input: FinalPicksInput): Promise<FinalPicksOutput> {
  return finalPicksGeneratorFlow(input);
}

const finalPicksGeneratorFlow = ai.defineFlow(
  {
    name: 'finalPicksGeneratorFlow',
    inputSchema: FinalPickInputSchema,
    outputSchema: FinalPicksOutputSchema,
  },
  async (input) => {
    const prompt = `You are Rajib, an expert MLB betting analyst creating the final betting picks by combining trap analysis and market signal analysis with strict risk management.

GAME: ${input.gameDetails}

TRAP ANALYSIS RESULTS:
=====================
Trap Detected: ${input.trapAnalysis.isTrap}
Trap Side: ${input.trapAnalysis.trapSide || 'N/A'}
Value Side: ${input.trapAnalysis.valueSide || 'N/A'}
Confidence: ${input.trapAnalysis.confidence}%
Recommendation: ${input.trapAnalysis.recommendation}
Summary: ${input.trapAnalysis.summary}

SIGNAL ANALYSIS RESULTS:
=======================
Total Signals: ${input.signalAnalysis.signals.length}
Top Picks: ${JSON.stringify(input.signalAnalysis.topPicks, null, 2)}
Overall Confidence: ${input.signalAnalysis.overallConfidence}%
Recommended Bankroll: ${input.signalAnalysis.recommendedBankroll}%
Avoid Bets: ${JSON.stringify(input.signalAnalysis.avoidBets, null, 2)}

RISK MANAGEMENT PARAMETERS:
==========================
Total Bankroll: $${input.bankrollManagement.totalBankroll}
Max Risk Per Game: ${input.bankrollManagement.maxRiskPerGame}%
Current Exposure: ${input.bankrollManagement.currentExposure}%
Max Bets Per Game: ${input.marketLimits.maxBetsPerGame}
Min Confidence: ${input.marketLimits.minConfidence}%
Min Expected Value: ${input.marketLimits.minExpectedValue}%

FINAL PICKS GENERATION INSTRUCTIONS:
===================================

1. TRAP ANALYSIS INTEGRATION:
   - If trap detected, prioritize value side recommendations
   - Avoid or reduce stakes on trap side bets
   - Use trap confidence to adjust overall position sizing

2. SIGNAL PRIORITIZATION:
   - Focus on VERY_STRONG and STRONG signals first
   - Ensure signals align with trap analysis (no conflicts)
   - Prioritize signals with highest expected value

3. RISK MANAGEMENT RULES:
   - Never exceed max risk per game percentage
   - Total units across all picks should not exceed 15 units
   - Higher confidence picks get larger unit sizing
   - Avoid highly correlated bets unless strategic

4. PICK CLASSIFICATION:
   - LOCK: 85%+ confidence, trap-confirmed, 3-5 units
   - STRONG: 75-84% confidence, solid signals, 2-3 units  
   - VALUE: 65-74% confidence, good odds value, 1-2 units
   - HEDGE: Strategic picks to reduce risk, 0.5-1 units

5. CORRELATION WARNINGS:
   - Flag picks that are highly correlated
   - Warn about over-exposure to specific outcomes
   - Suggest diversification across market types

6. STAKE CALCULATION:
   - Calculate actual dollar amounts based on bankroll
   - Unit size = (Confidence - 50) / 10, max 5 units
   - Adjust for bankroll constraints and current exposure

    try {
      const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: prompt,
        output: {
          schema: FinalPicksOutputSchema
        },
        config: {
          temperature: 0.2, // Lower temperature for consistent picks
          maxOutputTokens: 2500,
        }
      });

      return output!;
    } catch (error) {
      console.error('Final picks generation failed:', error);
      throw new Error('Failed to generate final picks. Please try again.');
    }
  }
);