// Question types as const object (better than enum with erasableSyntaxOnly)
export const QuestionType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
} as const;

export type QuestionType = typeof QuestionType[keyof typeof QuestionType];

export interface AnswerResponse {
  id: string;
  content: string;
  isCorrect: boolean;
}

export interface AnswerRequest {
  content: string;
  isCorrect: boolean;
}

export interface QuestionResponse {
  id: string;
  content: string;
  type: QuestionType;
  score: number;
  isActive: boolean;
  answers: AnswerResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionRequest {
  content: string;
  type: QuestionType;
  score: number;
  answers: AnswerRequest[];
}
