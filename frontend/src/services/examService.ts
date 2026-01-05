import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/types/auth';
import type { ExamSubmitRequest, ExamResultResponse } from '@/types/exam';

// Submit exam answers
export const submitExam = async (data: ExamSubmitRequest): Promise<ExamResultResponse> => {
  const response = await apiClient.post<ApiResponse<ExamResultResponse>>('/exam/submit', data);
  return response.data.data;
};
