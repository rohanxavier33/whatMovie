import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-background to-blue-900/20 animate-gradient" />

      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-5xl sm:text-7xl font-bold mb-4 bg-gradient-to-r from-accent-light to-purple-300 bg-clip-text text-transparent">
          whatMovie
        </h1>
        <p className="text-xl sm:text-2xl text-muted mb-2">
          10 questions. 5 perfect movies.
        </p>
        <p className="text-base text-muted/70 mb-10">
          Take a quick personality quiz and let AI find your ideal movie night picks.
        </p>

        <Link
          href="/quiz"
          className="inline-block px-10 py-4 bg-accent hover:bg-accent-light text-white font-semibold
            rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
        >
          Start Quiz
        </Link>
      </div>
    </main>
  );
}
