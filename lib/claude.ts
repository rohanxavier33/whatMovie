import OpenAI from "openai";
import { QuizAnswersPayload, claudeResponseSchema, ClaudeResponse } from "./schemas";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

function buildPrompt(answers: QuizAnswersPayload): string {
  const parts: string[] = [];

  if (answers.pace) parts.push(`Preferred pace: ${answers.pace.replace(/_/g, " ")}`);
  if (answers.mood) parts.push(`Mood: ${answers.mood}`);
  if (answers.emotional_intensity) parts.push(`Emotional intensity: ${answers.emotional_intensity}`);
  if (answers.era) parts.push(`Willing to watch movies from ${answers.era} onwards`);
  if (answers.acclaimed) parts.push(`Preference: ${answers.acclaimed === "acclaimed" ? "critically acclaimed films" : "crowd-pleasing popular films"}`);
  if (answers.setting) parts.push(`Setting preference: ${answers.setting.replace(/_/g, " ")}`);
  if (answers.runtime) {
    const runtimeMap: Record<string, string> = { short: "under 100 minutes", medium: "100-140 minutes", long: "over 140 minutes" };
    parts.push(`Runtime: ${runtimeMap[answers.runtime] || answers.runtime}`);
  }
  if (answers.audience) {
    const audienceMap: Record<string, string> = { solo: "watching alone", partner: "date night", group: "group or family viewing" };
    parts.push(`Audience: ${audienceMap[answers.audience] || answers.audience}`);
  }
  if (answers.familiarity) parts.push(`Familiarity preference: ${answers.familiarity.replace(/_/g, " ")}`);
  if (answers.wildcard) parts.push(`Special request: "${answers.wildcard}"`);

  return `You are an expert movie recommender. Based on these preferences, recommend exactly 5 movies:

${parts.join("\n")}

Respond with ONLY valid JSON (no markdown, no code fences) in this exact format:
{
  "summary": "A 2-3 sentence personality read of this viewer based on their preferences. Be witty and insightful.",
  "movies": [
    {
      "title": "Exact Movie Title",
      "year": 2020,
      "reason": "A personalized 1-2 sentence reason why this movie fits their preferences."
    }
  ]
}

Important:
- Use the exact official movie title as it would appear on TMDB/IMDb
- Include exactly 5 movies
- Each reason should reference their specific preferences
- Be creative and diverse in your picks — don't just pick the most obvious choices`;
}

function parseClaudeJSON(text: string): ClaudeResponse {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  const parsed = JSON.parse(cleaned);
  return claudeResponseSchema.parse(parsed);
}

export async function getRecommendations(answers: QuizAnswersPayload): Promise<ClaudeResponse> {
  const prompt = buildPrompt(answers);

  const response = await client.chat.completions.create({
    model: "qwen/qwen3-next-80b-a3b-instruct:free",
    max_tokens: 1024,
    temperature: 0.9,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("No text response from model");
  }

  return parseClaudeJSON(text);
}
