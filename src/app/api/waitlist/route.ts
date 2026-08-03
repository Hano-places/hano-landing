import { NextResponse } from "next/server";
import { z } from "zod";
import { appendWaitlistToSheet } from "@/lib/waitlist-sheets";

const waitlistSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  phone: z.string().optional(),
  favoriteRestaurant: z.string().optional(),
  favoriteCuisine: z.string().optional(),
  audience: z.enum(["local", "visitor", "partner"]).optional(),
  answers: z.record(z.string(), z.array(z.string())).optional(),
  skippedQuestions: z.boolean().optional(),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = waitlistSchema.parse(body);

    await appendWaitlistToSheet(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    console.error("[waitlist] failed to save signup", error);
    return NextResponse.json(
      { error: "Failed to save signup" },
      { status: 502 },
    );
  }
}
