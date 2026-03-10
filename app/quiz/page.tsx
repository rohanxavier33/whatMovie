"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { questions } from "@/data/questions";
import { Answer, QuizAnswers } from "@/types/quiz";
import ProgressBar from "@/components/quiz/ProgressBar";
import QuestionRenderer from "@/components/quiz/QuestionRenderer";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState(1);

  const current = questions[step];
  const currentValue = answers[current.tag];
  const isLast = step === questions.length - 1;

  const isAnswered =
    currentValue !== undefined &&
    (current.type !== "free_text" || (typeof currentValue === "string" && currentValue.trim().length > 0));

  const handleAnswer = useCallback(
    (value: Answer) => {
      setAnswers((prev) => ({ ...prev, [current.tag]: value }));
    },
    [current.tag]
  );

  const next = () => {
    if (isLast) {
      sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
      router.push("/results");
    } else {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <ProgressBar current={step} total={questions.length} />

        <div className="mt-12 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ x: direction * 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -80, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex-1"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                {current.question}
              </h2>
              {current.subtitle && (
                <p className="text-muted text-center mb-8">{current.subtitle}</p>
              )}
              {!current.subtitle && <div className="mb-8" />}

              <QuestionRenderer
                config={current}
                value={currentValue}
                onAnswer={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-12">
            <button
              onClick={back}
              disabled={step === 0}
              className="px-6 py-3 rounded-full text-muted hover:text-foreground transition-colors
                disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Back
            </button>

            <button
              onClick={next}
              disabled={!isAnswered}
              className="px-8 py-3 bg-accent hover:bg-accent-light text-white font-semibold
                rounded-full transition-all duration-200 hover:scale-105
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLast ? "Get My Movies" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
