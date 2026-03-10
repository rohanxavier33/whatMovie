"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const messages = [
  "Analyzing your movie soul...",
  "Consulting the cinematic oracle...",
  "Matching vibes to movies...",
  "Digging through film archives...",
  "Almost there, popcorn's ready...",
];

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full border-4 border-card border-t-accent mb-8"
      />
      <motion.p
        key={msgIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-xl text-muted"
      >
        {messages[msgIndex]}
      </motion.p>
    </div>
  );
}
