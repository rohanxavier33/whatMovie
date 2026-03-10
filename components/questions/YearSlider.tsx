"use client";

import { QuestionConfig, Answer } from "@/types/quiz";

interface Props {
  config: QuestionConfig;
  value: Answer | undefined;
  onAnswer: (value: Answer) => void;
}

export default function YearSlider({ config, value, onAnswer }: Props) {
  const min = config.min ?? 1950;
  const max = config.max ?? 2026;
  const current = typeof value === "number" ? value : 2000;

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
      <div className="text-7xl font-bold text-accent tabular-nums">{current}</div>
      <input
        type="range"
        min={min}
        max={max}
        value={current}
        onChange={(e) => onAnswer(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between w-full text-sm text-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
