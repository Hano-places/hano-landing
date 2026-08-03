import { z } from "zod";

export const emailWaitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const onboardingWaitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  audience: z.enum(["local", "visitor", "partner"]).optional(),
  answers: z.record(z.string(), z.array(z.string())).default({}),
  source: z.string().optional(),
  skippedQuestions: z.boolean().optional(),
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
export type OnboardingWaitlistInput = z.infer<typeof onboardingWaitlistSchema>;
export type FullWaitlistInput = z.infer<typeof fullWaitlistSchema>;
