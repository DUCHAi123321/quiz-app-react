import { useState } from 'react';
import toast from 'react-hot-toast';
import * as quizService from '@/services/quizService';
import type { PageResponse, PaginationParams } from '@/types/common';
import type { QuizRequest, QuizResponse, QuizSearchParams } from '@/types/quiz';

export const useQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<PageResponse<QuizResponse> | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizResponse | null>(null);

  const fetchQuizzes = async (params?: PaginationParams) => {
    try {
      setLoading(true);
      const data = await quizService.getAllQuizzes(params);
      setQuizzes(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
      toast.error('Failed to load quizzes');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchQuizzes = async (params: QuizSearchParams) => {
    try {
      setLoading(true);
      const data = await quizService.searchQuizzes(params);
      setQuizzes(data);
      return data;
    } catch (error) {
      console.error('Failed to search quizzes:', error);
      toast.error('Failed to search quizzes');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizById = async (id: string) => {
    try {
      setLoading(true);
      const data = await quizService.getQuizById(id);
      setCurrentQuiz(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
      toast.error('Failed to load quiz details');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async (data: QuizRequest) => {
    try {
      setLoading(true);
      const newQuiz = await quizService.createQuiz(data);
      toast.success('Quiz created successfully');
      return newQuiz;
    } catch (error) {
      console.error('Failed to create quiz:', error);
      toast.error('Failed to create quiz');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuiz = async (id: string, data: QuizRequest) => {
    try {
      setLoading(true);
      const updatedQuiz = await quizService.updateQuiz(id, data);
      toast.success('Quiz updated successfully');
      return updatedQuiz;
    } catch (error) {
      console.error('Failed to update quiz:', error);
      toast.error('Failed to update quiz');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id: string) => {
    try {
      setLoading(true);
      await quizService.deleteQuiz(id);
      toast.success('Quiz deleted successfully');
    } catch (error) {
      console.error('Failed to delete quiz:', error);
      toast.error('Failed to delete quiz');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addQuestionsToQuiz = async (id: string, questionIds: string[]) => {
    try {
      setLoading(true);
      const updatedQuiz = await quizService.addQuestionsToQuiz(id, questionIds);
      toast.success('Questions added successfully');
      return updatedQuiz;
    } catch (error) {
      console.error('Failed to add questions:', error);
      toast.error('Failed to add questions');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeQuestionsFromQuiz = async (id: string, questionIds: string[]) => {
    try {
      setLoading(true);
      const updatedQuiz = await quizService.removeQuestionsFromQuiz(id, questionIds);
      toast.success('Questions removed successfully');
      return updatedQuiz;
    } catch (error) {
      console.error('Failed to remove questions:', error);
      toast.error('Failed to remove questions');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    quizzes,
    currentQuiz,
    fetchQuizzes,
    searchQuizzes,
    fetchQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    addQuestionsToQuiz,
    removeQuestionsFromQuiz,
  };
};
