import { useState } from 'react';
import toast from 'react-hot-toast';
import * as questionService from '@/services/questionService';
import type { PageResponse, PaginationParams } from '@/types/common';
import type { QuestionRequest, QuestionResponse } from '@/types/question';

export const useQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<PageResponse<QuestionResponse> | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionResponse | null>(null);

  const fetchQuestions = async (params?: PaginationParams) => {
    try {
      setLoading(true);
      const data = await questionService.getAllQuestions(params);
      setQuestions(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      toast.error('Failed to load questions');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionById = async (id: string) => {
    try {
      setLoading(true);
      const data = await questionService.getQuestionById(id);
      setCurrentQuestion(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch question:', error);
      toast.error('Failed to load question details');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createQuestion = async (data: QuestionRequest) => {
    try {
      setLoading(true);
      const newQuestion = await questionService.createQuestion(data);
      toast.success('Question created successfully');
      return newQuestion;
    } catch (error) {
      console.error('Failed to create question:', error);
      toast.error('Failed to create question');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuestion = async (id: string, data: QuestionRequest) => {
    try {
      setLoading(true);
      const updatedQuestion = await questionService.updateQuestion(id, data);
      toast.success('Question updated successfully');
      return updatedQuestion;
    } catch (error) {
      console.error('Failed to update question:', error);
      toast.error('Failed to update question');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id: string) => {
    try {
      setLoading(true);
      await questionService.deleteQuestion(id);
      toast.success('Question deleted successfully');
    } catch (error) {
      console.error('Failed to delete question:', error);
      toast.error('Failed to delete question');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    questions,
    currentQuestion,
    fetchQuestions,
    fetchQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
};
