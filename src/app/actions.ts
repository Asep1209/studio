"use server";

import { generateTitle, type GenerateTitleInput } from "@/ai/flows/generate-title";

export async function generateTitleAction(input: GenerateTitleInput) {
  // This function is defined as a server action and will be executed on the server.
  // It calls the Genkit flow to generate a title.
  return await generateTitle(input);
}
