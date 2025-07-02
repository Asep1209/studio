'use server';
/**
 * @fileOverview A flow for generating a creative title for a music track.
 *
 * - generateTitle - A function that handles the title generation process.
 * - GenerateTitleInput - The input type for the generateTitle function.
 * - GenerateTitleOutput - The return type for the generateTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateTitleInputSchema = z.object({
  fileName: z.string().describe('The original filename of the music track.'),
});
export type GenerateTitleInput = z.infer<typeof GenerateTitleInputSchema>;

export type GenerateTitleOutput = string;

export async function generateTitle(input: GenerateTitleInput): Promise<GenerateTitleOutput> {
  return generateTitleFlow(input);
}

const generateTitlePrompt = ai.definePrompt({
  name: 'generateTitlePrompt',
  input: { schema: GenerateTitleInputSchema },
  output: { schema: z.string() },
  prompt: `You are a creative director for a record label.
  Based on the provided filename, generate a cool, interesting, and catchy title for this music track.
  The title should be imaginative and suitable for a modern audience.
  Just return the title itself, without any extra words like "Title:" or quotation marks.

  Filename: {{{fileName}}}`,
});

const generateTitleFlow = ai.defineFlow(
  {
    name: 'generateTitleFlow',
    inputSchema: GenerateTitleInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { output } = await generateTitlePrompt(input);
    return output!;
  }
);
