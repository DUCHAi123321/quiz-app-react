import apiClient from '@/lib/axios';
import type { PageResponse, PaginationParams } from '@/types/common';
import type { QuestionRequest, QuestionResponse } from '@/types/question';

// Get all questions with pagination
export const getAllQuestions = async (params?: PaginationParams): Promise<PageResponse<QuestionResponse>> => {
  const response = await apiClient.get<PageResponse<QuestionResponse>>('/questions', { params });
  return response.data;
};

// Get question by ID
export const getQuestionById = async (id: string): Promise<QuestionResponse> => {
  const response = await apiClient.get<QuestionResponse>(`/questions/${id}`);
  return response.data;
};

// Create a new question (Admin only)
export const createQuestion = async (data: QuestionRequest): Promise<QuestionResponse> => {
  const response = await apiClient.post<QuestionResponse>('/questions', data);
  return response.data;
};

// Update question (Admin only)
export const updateQuestion = async (id: string, data: QuestionRequest): Promise<QuestionResponse> => {
  const response = await apiClient.put<QuestionResponse>(`/questions/${id}`, data);
  return response.data;
};

// Delete question - soft delete (Admin only)
export const deleteQuestion = async (id: string): Promise<void> => {
  await apiClient.delete(`/questions/${id}`);
};
