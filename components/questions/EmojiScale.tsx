"use client";

import { QuestionConfig, Answer } from "@/types/quiz";

interface Props {
  config: QuestionConfig;
  value: Answer | undefined;
  onAnswer: (value: Answer) => void;
}

export default function EmojiScale({ config, value, onAnswer }: Props) {
  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {config.options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onAnswer(opt.value)}
          className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl transition-all duration-200
            ${
              value === opt.value
                ? "bg-accent/20 ring-2 ring-accent scale-110"
                : "bg-card hover:bg-card-hover hover:scale-105"
            }`}
        >
          <span className="text-3xl sm:text-4xl">{opt.emoji}</span>
          <span className="text-xs text-muted">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
