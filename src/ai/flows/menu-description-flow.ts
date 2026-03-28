'use server';
/**
 * @fileOverview AI agent to generate mouth-watering Indian menu descriptions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MenuDescInputSchema = z.object({
  dishName: z.string().describe('The name of the Indian dish.'),
  category: z.string().describe('The category (e.g., Curry, Biryani, Snack).'),
  isVeg: z.boolean().describe('Whether the dish is vegetarian.'),
});
export type MenuDescInput = z.infer<typeof MenuDescInputSchema>;

const MenuDescOutputSchema = z.object({
  description: z.string().describe('A lush, 2-sentence description focusing on authentic Indian spices and textures.'),
});
export type MenuDescOutput = z.infer<typeof MenuDescOutputSchema>;

export async function generateMenuDescription(input: MenuDescInput): Promise<MenuDescOutput> {
  return menuDescFlow(input);
}

const prompt = ai.definePrompt({
  name: 'menuDescPrompt',
  input: { schema: MenuDescInputSchema },
  output: { schema: MenuDescOutputSchema },
  prompt: `You are a world-class food critic specializing in Indian cuisine.
Generate a mouth-watering, 2-sentence description for the following dish. 
Focus on authentic spice blends (like garam masala, cardamom, saffron), cooking methods (tandoor, slow-cooked), and the emotional experience of eating it.

Dish Name: {{{dishName}}}
Category: {{{category}}}
Type: {{#if isVeg}}Vegetarian{{else}}Non-Vegetarian{{/if}}`,
});

const menuDescFlow = ai.defineFlow(
  {
    name: 'menuDescFlow',
    inputSchema: MenuDescInputSchema,
    outputSchema: MenuDescOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);