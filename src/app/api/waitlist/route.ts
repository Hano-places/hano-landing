import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  phone: z.string().optional(),
  favoriteRestaurant: z.string().optional(),
  favoriteCuisine: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = waitlistSchema.parse(body);

    if (!data.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // Stub: log for now; wire to email provider later
    console.log("[waitlist]", data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}
