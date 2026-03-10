"use client";

import { motion } from "motion/react";

interface Props {
  summary: string;
}

export default function SummaryBlurb({ summary }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mb-12 p-6 bg-accent/10 border border-accent/20 rounded-2xl"
    >
      <p className="text-lg text-foreground/90 leading-relaxed">{summary}</p>
    </motion.div>
  );
}
