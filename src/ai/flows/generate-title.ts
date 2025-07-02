import { ai } from '../genkit';
import * as z from 'zod';

// This is a mock flow. In a real application, you would implement
// the logic to analyze the audio and generate a title.
export const generateTitleFlow = ai.defineFlow(
  {
    name: 'generateTitleFlow',
    inputSchema: z.object({ fileName: z.string() }),
    outputSchema: z.string(),
  },
  async ({ fileName }) => {
    // Simulate AI processing time.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Remove file extension and clean up the name for a better "mock" generation.
    const baseName = fileName.split('.').slice(0, -1).join('.')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ');

    // Simple heuristic for a mock title. In a real scenario, an LLM would be prompted.
    const adjectives = ['Cosmic', 'Midnight', 'Electric', 'Lost', 'Golden', 'Silent', 'Forgotten', 'Crystal'];
    const nouns = ['Journey', 'Dream', 'Echoes', 'Vibes', 'Odyssey', 'Serenade', 'Rhapsody', 'Waves'];
    
    // Use a simple hashing function on filename to make the random choice deterministic for the same file.
    let hash = 0;
    for (let i = 0; i < baseName.length; i++) {
        const char = baseName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    const randomAdjective = adjectives[Math.abs(hash) % adjectives.length];
    const randomNoun = nouns[Math.abs(hash) % nouns.length];

    // Capitalize first letters
    const formattedBaseName = baseName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    if (Math.random() > 0.66) {
        return `${randomAdjective} ${randomNoun}`;
    }
    return `AI: ${formattedBaseName}`;
  }
);
