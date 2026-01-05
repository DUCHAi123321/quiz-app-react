package com.hai.quizapp.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hai.quizapp.entities.Question;
import com.hai.quizapp.enums.QuestionType;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {

    List<Question> findByIsActiveTrue();

    Page<Question> findByIsActiveTrue(Pageable pageable);

    Page<Question> findByIsActive(Boolean isActive, Pageable pageable);

    Page<Question> findByContentContainingIgnoreCase(String content, Pageable pageable);

    Page<Question> findByType(QuestionType type, Pageable pageable);

    Page<Question> findByContentContainingIgnoreCaseAndIsActive(String content, Boolean isActive, Pageable pageable);

    Page<Question> findByTypeAndIsActive(QuestionType type, Boolean isActive, Pageable pageable);

    Page<Question> findByContentContainingIgnoreCaseAndType(String content, QuestionType type, Pageable pageable);

    Page<Question> findByContentContainingIgnoreCaseAndTypeAndIsActive(String content, QuestionType type, Boolean isActive, Pageable pageable);

    @Query("SELECT q FROM Question q LEFT JOIN FETCH q.answers WHERE q.id = :id")
    Optional<Question> findByIdWithAnswers(UUID id);

    @Query("SELECT DISTINCT q FROM Question q LEFT JOIN FETCH q.answers WHERE q.isActive = true")
    List<Question> findAllActiveWithAnswers();
}
