// src/ai/genkit.ts (or wherever you're placing this)
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Specifying the API version is a good practice for stability
      apiVersion: 'v1beta',
    }),
  ],
  // Recommended settings for better observability
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});