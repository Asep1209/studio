"use server";

import { generateTitleFlow } from "@/ai/flows/generate-title";
import { z } from "zod";

const inputSchema = z.object({
  fileName: z.string(),
});

export async function generateTitleAction(input: z.infer<typeof inputSchema>) {
  const { fileName } = inputSchema.parse(input);
  // This function is defined as a server action and will be executed on the server.
  // It calls the Genkit flow to generate a title.
  return await generateTitleFlow({ fileName });
}
