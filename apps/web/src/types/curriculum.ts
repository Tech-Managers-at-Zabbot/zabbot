// apps/web/src/types/curriculum.ts

export interface ContentBlock {
  type: string;
  yoruba: string;
  english: string;
  description: string;
  studentNote?: string;
  audioUrl?: string;
  videoUrl?: string;
  fileUrl?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface JourneyLesson {
  title: string;
  heroImage: string;
  contentBlocks: ContentBlock[];
  quizzes: QuizQuestion[];
}