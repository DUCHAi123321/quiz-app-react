import { QuestionResponse } from './question';

export interface QuizResponse {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  active: boolean;
  questions: QuestionResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizRequest {
  title: string;
  description?: string;
  durationMinutes: number;
  questionIds?: string[];
}

export interface QuizSearchParams {
  title?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
}
