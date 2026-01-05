import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/types/auth';
import type { PageResponse, PaginationParams } from '@/types/common';
import type { QuizRequest, QuizResponse, QuizSearchParams } from '@/types/quiz';

export const getAllQuizzes = async (params?: PaginationParams): Promise<PageResponse<QuizResponse>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<QuizResponse>>>('/quizzes', { params });
  return response.data.data;
};

export const searchQuizzes = async (params: QuizSearchParams): Promise<PageResponse<QuizResponse>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<QuizResponse>>>('/quizzes/search', { params });
  return response.data.data;
};

export const getQuizById = async (id: string): Promise<QuizResponse> => {
  const response = await apiClient.get<ApiResponse<QuizResponse>>(`/quizzes/${id}`);
  return response.data.data;
};

export const createQuiz = async (data: QuizRequest): Promise<QuizResponse> => {
  const response = await apiClient.post<ApiResponse<QuizResponse>>('/quizzes', data);
  return response.data.data;
};

export const updateQuiz = async (id: string, data: QuizRequest): Promise<QuizResponse> => {
  const response = await apiClient.put<ApiResponse<QuizResponse>>(`/quizzes/${id}`, data);
  return response.data.data;
};

export const addQuestionsToQuiz = async (id: string, questionIds: string[]): Promise<QuizResponse> => {
  const response = await apiClient.post<ApiResponse<QuizResponse>>(`/quizzes/${id}/questions`, questionIds);
  return response.data.data;
};

export const removeQuestionsFromQuiz = async (id: string, questionIds: string[]): Promise<QuizResponse> => {
  const response = await apiClient.delete<ApiResponse<QuizResponse>>(`/quizzes/${id}/questions`, { data: questionIds });
  return response.data.data;
};

export const deleteQuiz = async (id: string): Promise<void> => {
  await apiClient.delete(`/quizzes/${id}`);
};
