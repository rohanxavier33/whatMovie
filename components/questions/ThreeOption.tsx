"use client";

import { QuestionConfig, Answer } from "@/types/quiz";

interface Props {
  config: QuestionConfig;
  value: Answer | undefined;
  onAnswer: (value: Answer) => void;
}

export default function ThreeOption({ config, value, onAnswer }: Props) {
  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto">
      {config.options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onAnswer(opt.value)}
          className={`flex items-center gap-3 px-6 py-4 rounded-xl text-left transition-all duration-200
            ${
              value === opt.value
                ? "bg-accent/20 ring-2 ring-accent"
                : "bg-card hover:bg-card-hover"
            }`}
        >
          <span className="text-2xl">{opt.emoji}</span>
          <span className="font-medium">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
