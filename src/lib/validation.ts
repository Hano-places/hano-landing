import { z } from "zod";

export const emailWaitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const fullWaitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z.string().optional(),
  favoriteRestaurant: z.string().optional(),
  favoriteCuisine: z.string().optional(),
});

export type EmailWaitlistInput = z.infer<typeof emailWaitlistSchema>;
export type FullWaitlistInput = z.infer<typeof fullWaitlistSchema>;
