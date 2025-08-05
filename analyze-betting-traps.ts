// src/ai/flows/analyze-betting-traps.ts
'use server';

import { ai } from '@/ai/genkit';
import {
  AnalyzeBettingTrapsInputSchema,
  AnalyzeBettingTrapsOutputSchema,
  type AnalyzeBettingTrapsInput,
  type AnalyzeBettingTrapsOutput,
} from './analyze-betting-traps.types';

export async function analyzeBettingTraps(input: AnalyzeBettingTrapsInput): Promise<AnalyzeBettingTrapsOutput> {
  return analyzeBettingTrapsFlow(input);
}

const analyzeBettingTrapsFlow = ai.defineFlow(
  {
    name: 'analyzeBettingTrapsFlow',
    inputSchema: AnalyzeBettingTrapsInputSchema,
    outputSchema: AnalyzeBettingTrapsOutputSchema,
  },
  async (input) => {
    
    const prompt = `You are an expert MLB betting analyst specializing in identifying trap games. Analyze the provided real-time data to determine if this game presents a betting trap.

CRITICAL INSTRUCTIONS:
1. Use ONLY the actual data provided - do not make up player names or statistics
2. Focus on specific numerical discrepancies between the odds and underlying metrics
3. Look for sharp vs public money indicators
4. Identify value opportunities based on data mismatches

GAME DATA TO ANALYZE:
===================
Game: ${JSON.stringify(input.gameDetails)}
Pitchers: ${JSON.stringify(input.probablePitchers)}
Live Odds: ${JSON.stringify(input.liveOdds)}
Weather: ${JSON.stringify(input.weather)}
Injuries: ${JSON.stringify(input.injuries)}
Bullpen Data: ${JSON.stringify(input.bullpenData)}
Key Batters: ${JSON.stringify(input.keyBatterStats)}

TRAP INDICATORS TO EXAMINE:
- Odds that seem too generous for the favorite
- Public team getting surprisingly low odds
- Weather conditions favoring underdog but not reflected in line
- Key injuries not properly priced into odds
- Bullpen fatigue/strength mismatches
- Pitcher vs batter historical matchups
- Park factors favoring one team significantly
- Line movement contrary to expected public betting patterns

ANALYSIS FRAMEWORK:
1. Calculate the implied probability from the odds
2. Compare against team performance metrics
3. Identify any major discrepancies
4. Assess if the line is designed to attract public money to the wrong side
5. Determine if sharp money would likely go opposite to public perception

Provide your analysis in this exact format:
- Start with "TRAP DETECTED" or "NO TRAP DETECTED"
- Give specific reasoning using the actual data provided
- List the 3 most important factors that led to your conclusion
- Be specific about which team offers better value and why

Remember: A trap bet appears favorable on the surface but has hidden factors that make the opposite side more valuable.`;

    try {
      const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: prompt,
        output: {
          schema: AnalyzeBettingTrapsOutputSchema
        }
      });

      return output!;
    } catch (error) {
      console.error('Failed to analyze betting traps:', error);
      throw new Error('Analysis failed. Please try again.');
    }
  }
);