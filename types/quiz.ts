export type QuestionType =
  | "emoji_scale"
  | "image_card_grid"
  | "three_option"
  | "year_slider"
  | "toggle"
  | "free_text";

export interface OptionItem {
  value: string;
  label: string;
  emoji?: string;
  gradient?: string;
}

export interface QuestionConfig {
  id: number;
  type: QuestionType;
  tag: string;
  question: string;
  subtitle?: string;
  options: OptionItem[];
  min?: number;
  max?: number;
  maxLength?: number;
  placeholder?: string;
}

export type Answer = string | number;

export type QuizAnswers = Record<string, Answer>;
