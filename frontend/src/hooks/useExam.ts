import { useState } from 'react';
import toast from 'react-hot-toast';
import * as examService from '@/services/examService';
import type { ExamSubmitRequest, ExamResultResponse } from '@/types/exam';

export const useExam = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExamResultResponse | null>(null);

  const submitExam = async (data: ExamSubmitRequest) => {
    try {
      setLoading(true);
      const examResult = await examService.submitExam(data);
      setResult(examResult);
      
      if (examResult.passed) {
        toast.success(`Congratulations! You passed with ${examResult.percentage.toFixed(1)}%`);
      } else {
        toast.error(`You scored ${examResult.percentage.toFixed(1)}%. Keep practicing!`);
      }
      
      return examResult;
    } catch (error) {
      console.error('Failed to submit exam:', error);
      toast.error('Failed to submit exam');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    result,
    submitExam,
  };
};
