"use client";

import { QuestionConfig, Answer } from "@/types/quiz";
import EmojiScale from "@/components/questions/EmojiScale";
import ImageCardGrid from "@/components/questions/ImageCardGrid";
import ThreeOption from "@/components/questions/ThreeOption";
import YearSlider from "@/components/questions/YearSlider";
import Toggle from "@/components/questions/Toggle";
import FreeText from "@/components/questions/FreeText";

const componentMap = {
  emoji_scale: EmojiScale,
  image_card_grid: ImageCardGrid,
  three_option: ThreeOption,
  year_slider: YearSlider,
  toggle: Toggle,
  free_text: FreeText,
} as const;

interface Props {
  config: QuestionConfig;
  value: Answer | undefined;
  onAnswer: (value: Answer) => void;
}

export default function QuestionRenderer({ config, value, onAnswer }: Props) {
  const Component = componentMap[config.type];
  return <Component config={config} value={value} onAnswer={onAnswer} />;
}
