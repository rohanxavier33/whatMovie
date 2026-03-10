"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MovieRecommendation } from "@/types/recommendation";

interface Props {
  movie: MovieRecommendation;
  index: number;
}

export default function MovieCard({ movie, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-2xl overflow-hidden hover:bg-card-hover transition-colors"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-40 h-60 sm:h-auto shrink-0">
          {movie.posterUrl ? (
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/30 to-purple-900/30 flex items-center justify-center">
              <span className="text-5xl">🎬</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold">{movie.title}</h3>
            {movie.rating && (
              <span className="shrink-0 px-2 py-1 bg-success/20 text-success text-sm font-semibold rounded-lg">
                {movie.rating.toFixed(1)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted">{movie.year}</p>
          <p className="text-foreground/80 leading-relaxed mt-1">{movie.reason}</p>
        </div>
      </div>
    </motion.div>
  );
}
