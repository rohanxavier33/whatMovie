"use client";

import { QuestionConfig, Answer } from "@/types/quiz";

interface Props {
  config: QuestionConfig;
  value: Answer | undefined;
  onAnswer: (value: Answer) => void;
}

export default function Toggle({ config, value, onAnswer }: Props) {
  return (
    <div className="flex gap-4 justify-center max-w-md mx-auto">
      {config.options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onAnswer(opt.value)}
          className={`flex-1 flex flex-col items-center gap-2 px-6 py-6 rounded-2xl transition-all duration-200
            ${
              value === opt.value
                ? "bg-accent/20 ring-2 ring-accent scale-105"
                : "bg-card hover:bg-card-hover"
            }`}
        >
          <span className="text-3xl">{opt.emoji}</span>
          <span className="font-medium">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
