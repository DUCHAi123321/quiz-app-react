package com.hai.quizapp.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hai.quizapp.dtos.questions.QuestionRequest;
import com.hai.quizapp.dtos.questions.QuestionResponse;
import com.hai.quizapp.enums.QuestionType;

public interface QuestionService {

    QuestionResponse createQuestion(QuestionRequest request);

    Page<QuestionResponse> getAllQuestions(Pageable pageable);

    Page<QuestionResponse> searchQuestions(String content, QuestionType type, Boolean isActive, Pageable pageable);

    QuestionResponse getQuestionById(UUID id);

    QuestionResponse updateQuestion(UUID id, QuestionRequest request);

    void softDeleteQuestion(UUID id);
}
