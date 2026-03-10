"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingState from "@/components/results/LoadingState";
import SummaryBlurb from "@/components/results/SummaryBlurb";
import MovieCard from "@/components/results/MovieCard";
import { RecommendationResult } from "@/types/recommendation";

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    const raw = sessionStorage.getItem("quizAnswers");
    if (!raw) {
      router.replace("/quiz");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      const data: RecommendationResult = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">😵</p>
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-muted mb-6">{error}</p>
          <button
            onClick={fetchRecommendations}
            className="px-8 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-full transition-all"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!result) return null;

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Your Movie Night Picks
        </h1>

        <SummaryBlurb summary={result.summary} />

        <div className="flex flex-col gap-6">
          {result.movies.map((movie, i) => (
            <MovieCard key={movie.title} movie={movie} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/quiz"
            onClick={() => sessionStorage.removeItem("quizAnswers")}
            className="inline-block px-8 py-3 bg-card hover:bg-card-hover text-foreground
              font-semibold rounded-full transition-all"
          >
            Start Over
          </Link>
        </div>
      </div>
    </main>
  );
}
