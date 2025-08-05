'use server';

/**
 * @fileOverview Analyzes user's past picks and betting strategies to provide personalized lessons.
 *
 * - lessonLearning - A function that analyzes user data and provides learning insights.
 * - LessonLearningInput - The input type for the lessonLearning function.
 * - LessonLearningOutput - The return type for the lessonLearning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LessonLearningInputSchema = z.object({
  userId: z.string().describe('The ID of the user to analyze.'),
  pastPicks: z.string().describe('The user past picks with result data'),
  bettingStrategies: z.string().describe('The betting strategies used by the user.'),
});
export type LessonLearningInput = z.infer<typeof LessonLearningInputSchema>;

const LessonLearningOutputSchema = z.object({
  lessons: z.string().describe('Personalized lessons and suggestions for improving future performance.'),
});
export type LessonLearningOutput = z.infer<typeof LessonLearningOutputSchema>;

export async function lessonLearning(input: LessonLearningInput): Promise<LessonLearningOutput> {
  return lessonLearningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lessonLearningPrompt',
  input: {schema: LessonLearningInputSchema},
  output: {schema: LessonLearningOutputSchema},
  prompt: `You are an AI assistant designed to analyze the betting history of a user, identify patterns,
    and provide personalized lessons to improve their future betting performance. Consider the user's past picks and betting strategies.

User ID: {{{userId}}}
Past Picks: {{{pastPicks}}}
Betting Strategies: {{{bettingStrategies}}}

Analyze the above data and provide specific, actionable lessons for the user. Focus on identifying both strengths and weaknesses in their approach.
Output a clear set of lessons.
`,
});

const lessonLearningFlow = ai.defineFlow(
  {
    name: 'lessonLearningFlow',
    inputSchema: LessonLearningInputSchema,
    outputSchema: LessonLearningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
