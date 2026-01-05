import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import QuizCard from '@/components/QuizCard';
import Pagination from '@/components/Pagination';
import { useQuiz } from '@/hooks/useQuiz';
import { SkeletonList } from '@/components/Skeleton';
import map1 from '@/assets/images/map.png';
import map2 from '@/assets/images/map2.png';
import map3 from '@/assets/images/map3.png';

const QuizzesPage = () => {
  const navigate = useNavigate();
  const [quizCode, setQuizCode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, quizzes, fetchQuizzes } = useQuiz();

  // Fallback images for quizzes
  const thumbnails = [map1, map2, map3];

  // Fetch quizzes when page changes
  useEffect(() => {
    fetchQuizzes({ 
      page: currentPage - 1, // API uses 0-based indexing
      size: 9, 
      sort: 'createdAt', 
      direction: 'DESC' 
    }).catch(() => {
      // Silently handle error - let the UI show empty state
    });
  }, [currentPage, fetchQuizzes]);

  const handleStartQuiz = (quizId: string) => {
    navigate(`/quizzes/${quizId}`);
  };

  const handleTakeQuizByCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizCode.trim()) {
      navigate(`/quizzes/${quizCode}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    globalThis.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper function to determine quiz difficulty
  const getDifficulty = (questionCount: number): string => {
    if (questionCount > 20) return 'Hard';
    if (questionCount > 10) return 'Medium';
    return 'Easy';
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Take a Quiz Section */}
        <section className="bg-white py-12 px-4 border-b border-gray-200">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
              Take a Quiz
            </h1>
            
            <form onSubmit={handleTakeQuizByCode} className="max-w-3xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value)}
                  placeholder="Enter quiz code to take a quiz"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300 whitespace-nowrap"
                >
                  Take Quiz
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Quizzes List Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">QUIZZES</h2>
            </div>

            {/* Quiz Cards Grid */}
            {loading && <SkeletonList count={9} />}
            
            {!loading && quizzes && quizzes.content.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {quizzes.content.map((quiz, index) => (
                    <QuizCard
                      key={quiz.id}
                      id={quiz.id}
                      title={quiz.title}
                      description={quiz.description}
                      duration={`${quiz.durationMinutes}m`}
                      difficulty={getDifficulty(quiz.questions.length)}
                      thumbnail={thumbnails[index % thumbnails.length]}
                      onStart={() => handleStartQuiz(quiz.id)}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {quizzes.totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={quizzes.totalPages}
                      totalItems={quizzes.totalElements}
                      itemsPerPage={9}
                      onPageChange={handlePageChange}
                      onItemsPerPageChange={() => {}}
                    />
                  </div>
                )}
              </>
            )}
            
            {!loading && (!quizzes || quizzes.content.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-600">No quizzes available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default QuizzesPage;
