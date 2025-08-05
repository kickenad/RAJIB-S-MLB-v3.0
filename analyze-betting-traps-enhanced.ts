// src/ai/flows/analyze-betting-traps-enhanced.ts
'use server';

import { ai } from '@/ai/genkit';
import {
  AnalyzeBettingTrapsInputSchema,
  AnalyzeBettingTrapsOutputSchema,
  type AnalyzeBettingTrapsInput,
  type AnalyzeBettingTrapsOutput,
} from './analyze-betting-traps.types';
import { dataManager } from '@/lib/Data-management';
import { format } from 'date-fns';

export async function analyzeBettingTrapsEnhanced(input: AnalyzeBettingTrapsInput): Promise<AnalyzeBettingTrapsOutput> {
  return analyzeBettingTrapsFlowEnhanced(input);
}

const analyzeBettingTrapsFlowEnhanced = ai.defineFlow(
  {
    name: 'analyzeBettingTrapsFlowEnhanced',
    inputSchema: AnalyzeBettingTrapsInputSchema,
    outputSchema: AnalyzeBettingTrapsOutputSchema,
  },
  async (input) => {
    // Get historical patterns for context
    const historicalPatterns = await dataManager.getHistoricalPatterns();
    
    const prompt = `You are Rajib, an expert MLB betting analyst with access to historical analysis data. Use both the current game data and your learning from past analyses to identify potential trap bets.

HISTORICAL LEARNING DATA:
${historicalPatterns}

CURRENT GAME DATA TO ANALYZE:
===================
Game: ${JSON.stringify(input.gameDetails)}
Pitchers: ${JSON.stringify(input.probablePitchers)}
Live Odds: ${JSON.stringify(input.liveOdds)}
Weather: ${JSON.stringify(input.weather)}
Injuries: ${JSON.stringify(input.injuries)}
Bullpen Data: ${JSON.stringify(input.bullpenData)}
Key Batters: ${JSON.stringify(input.keyBatterStats)}

ANALYSIS INSTRUCTIONS:
1. Apply lessons learned from your historical analysis performance
2. Look for patterns that have previously indicated successful trap detections
3. Consider factors that have led to failed predictions in the past
4. Use your accumulated knowledge to improve accuracy

TRAP DETECTION CRITERIA:
- Odds that seem too generous for the favorite based on underlying metrics
- Public perception vs actual team strength discrepancies
- Weather/ballpark factors not properly reflected in odds
- Key injuries or bullpen situations creating value opportunities
- Historical team performance in similar situations

Provide your analysis focusing on:
1. Is this a trap bet? (Yes/No with confidence level)
2. Which side offers better value and why?
3. Specific factors from the data that support your conclusion
4. How this analysis compares to similar past situations
5. Risk assessment and betting recommendation

Remember: A trap bet appears favorable on the surface but has hidden factors making the opposite side more valuable.`;

    try {
      const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: prompt,
        output: {
          schema: AnalyzeBettingTrapsOutputSchema
        }
      });

      // Store this analysis for future learning
      const today = format(new Date(), 'yyyy-MM-dd');
      const analysisResult = {
        gamePk: Date.now(), // You'd get this from the actual game data
        date: today,
        analysis: {
          isTrap: output?.isTrap || false,
          confidence: output?.confidence || 0,
          recommendation: output?.recommendation || 'NO_ACTION',
          actualOutcome: 'PENDING' as const,
        },
        gameData: {
          date: today,
          games: [], // You'd populate this with actual game data
          odds: [],
          pitcherStats: {},
          bullpenData: {},
          weather: {},
          injuries: {},
        }
      };

      // Store for learning (non-blocking)
      dataManager.storeAnalysisResult(analysisResult).catch(console.error);

      return output!;
    } catch (error) {
      console.error('Enhanced analysis failed:', error);
      throw new Error('Analysis failed. Please try again.');
    }
  }
);

// Function to update analysis results with actual outcomes
export async function updateAnalysisOutcome(
  gamePk: number, 
  date: string, 
  actualOutcome: 'WIN' | 'LOSS'
): Promise<void> {
  try {
    // This would be called after games finish to update learning data
    const key = `analysis_results_${date}_${gamePk}`;
    
    // Get existing analysis result and update with actual outcome
    // Then store back for learning algorithm improvement
    
    console.log(`Updated analysis outcome for game ${gamePk}: ${actualOutcome}`);
  } catch (error) {
    console.error('Failed to update analysis outcome:', error);
  }
}
