export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

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
