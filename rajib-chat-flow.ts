// src/ai/flows/rajib-chat-flow.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HistoryItemSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const RajibChatInputSchema = z.object({
  history: z.array(HistoryItemSchema).describe("The conversation history."),
  message: z.string().describe('The latest message from the user.'),
});

export type RajibChatInput = z.infer<typeof RajibChatInputSchema>;

// Non-streaming version first - let's get it working
export async function rajibChat(input: RajibChatInput): Promise<string> {
  return rajibChatFlow(input);
}

const rajibChatFlow = ai.defineFlow(
  {
    name: 'rajibChatFlow',
    inputSchema: RajibChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { history, message } = input;
    
    // Build a simple prompt string instead of complex message arrays
    let prompt = `You are Rajib, an expert sports betting analyst specializing in Major League Baseball. Your tone is knowledgeable, confident, and helpful. Always introduce yourself as Rajib in your first response of a conversation.

Conversation History:
`;

    // Add conversation history
    for (const item of history) {
      const role = item.role === 'model' ? 'Rajib' : 'User';
      prompt += `${role}: ${item.content}\n`;
    }

    // Add current message
    prompt += `User: ${message}\nRajib:`;

    try {
      const llmResponse = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      });

      return llmResponse.text || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Rajib chat flow error:', error);
      
      // More specific error handling
      if (error.message?.includes('API key')) {
        throw new Error('API key not configured properly');
      } else if (error.message?.includes('quota')) {
        throw new Error('API quota exceeded');
      } else if (error.message?.includes('model')) {
        throw new Error('AI model unavailable');
      } else {
        throw new Error('Failed to generate response');
      }
    }
  }
);