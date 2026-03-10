"use client";

import { QuestionConfig, Answer } from "@/types/quiz";

interface Props {
  config: QuestionConfig;
  value: Answer | undefined;
  onAnswer: (value: Answer) => void;
}

export default function ImageCardGrid({ config, value, onAnswer }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {config.options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onAnswer(opt.value)}
          className={`relative flex flex-col items-center justify-center gap-2 p-6 rounded-2xl
            bg-gradient-to-br ${opt.gradient} transition-all duration-200
            ${
              value === opt.value
                ? "ring-2 ring-white scale-105 shadow-lg shadow-accent/30"
                : "opacity-80 hover:opacity-100 hover:scale-102"
            }`}
        >
          <span className="text-4xl">{opt.emoji}</span>
          <span className="text-sm font-medium text-white">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
