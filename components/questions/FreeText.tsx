"use client";

import { QuestionConfig, Answer } from "@/types/quiz";

interface Props {
  config: QuestionConfig;
  value: Answer | undefined;
  onAnswer: (value: Answer) => void;
}

export default function FreeText({ config, value, onAnswer }: Props) {
  const text = typeof value === "string" ? value : "";

  return (
    <div className="max-w-md mx-auto">
      <input
        type="text"
        autoFocus
        maxLength={config.maxLength ?? 100}
        placeholder={config.placeholder ?? "Type here..."}
        value={text}
        onChange={(e) => onAnswer(e.target.value)}
        className="w-full px-6 py-4 bg-card border border-card-hover rounded-xl text-lg
          placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent
          transition-all duration-200"
      />
      <p className="text-sm text-muted mt-2 text-right">
        {text.length}/{config.maxLength ?? 100}
      </p>
    </div>
  );
}
