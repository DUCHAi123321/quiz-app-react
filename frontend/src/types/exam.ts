export interface QuestionAnswerRequest {
  questionId: string;
  selectedAnswerIds: string[];
}

export interface ExamSubmitRequest {
  quizId: string;
  userId: string;
  answers: QuestionAnswerRequest[];
}

export interface ExamResultResponse {
  submissionId: string;
  quizId: string;
  quizTitle: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number;
  passed: boolean;
  submissionTime: string;
}
