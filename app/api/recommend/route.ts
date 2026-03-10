import { NextResponse } from "next/server";
import { quizAnswersSchema } from "@/lib/schemas";
import { getRecommendations } from "@/lib/claude";
import { enrichMovies } from "@/lib/tmdb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = quizAnswersSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.message },
        { status: 400 }
      );
    }

    const claudeResult = await getRecommendations(parsed.data);
    const movies = await enrichMovies(claudeResult.movies);

    return NextResponse.json({
      summary: claudeResult.summary,
      movies,
    });
  } catch (error) {
    console.error("Recommendation error:", error);

    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
