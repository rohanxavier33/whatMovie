import { z } from "zod";

export const quizAnswersSchema = z.object({
  pace: z.string().optional(),
  mood: z.string().optional(),
  emotional_intensity: z.string().optional(),
  era: z.union([z.string(), z.number()]).optional(),
  acclaimed: z.string().optional(),
  setting: z.string().optional(),
  runtime: z.string().optional(),
  audience: z.string().optional(),
  familiarity: z.string().optional(),
  wildcard: z.string().optional(),
});

export type QuizAnswersPayload = z.infer<typeof quizAnswersSchema>;

export const claudeMovieSchema = z.object({
  title: z.string(),
  year: z.number(),
  reason: z.string(),
});

export const claudeResponseSchema = z.object({
  summary: z.string(),
  movies: z.array(claudeMovieSchema).min(3).max(7),
});

export type ClaudeResponse = z.infer<typeof claudeResponseSchema>;
