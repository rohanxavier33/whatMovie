"use client";

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm text-muted">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-card rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
