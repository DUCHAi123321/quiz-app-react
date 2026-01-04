import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import QuizCard from '@/components/QuizCard';
import Button from '@/components/Button';
import { useQuiz } from '@/hooks/useQuiz';
import { SkeletonList } from '@/components/Skeleton';
import quizIllustration from '@/assets/images/quiz-bg-01.png';
import map1 from '@/assets/images/map.png';
import map2 from '@/assets/images/map2.png';
import map3 from '@/assets/images/map3.png';

const HomePage = () => {
  const navigate = useNavigate();
  const { loading, quizzes: quizzesData, fetchQuizzes } = useQuiz();

  // Fetch quizzes on component mount - only first 3 for homepage
  useEffect(() => {
    fetchQuizzes({ page: 0, size: 3, sort: 'createdAt', direction: 'DESC' });
  }, []);

  // Fallback images for quizzes
  const thumbnails = [map1, map2, map3];

  const handleStartQuiz = (quizId: string) => {
    navigate(`/quizzes/${quizId}`);
  };

  const handleTakeQuiz = () => {
    navigate('/quizzes');
  };

  // Helper function to determine quiz difficulty based on question count
  const getDifficulty = (questionCount: number): string => {
    if (questionCount > 20) return 'Hard';
    if (questionCount > 10) return 'Medium';
    return 'Easy';
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Welcome to Quiz App
              </h1>
              <p className="text-gray-600 leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada, nunc non lacinia 
                fermentum, velit ultrices sapien, nec tincidunt nunc nunc eu libero. Nullam nec 
                sollicitudin nunc. Nullam nec sollicitudin nunc.
              </p>
              <Button variant="primary" onClick={handleTakeQuiz}>
                Take a Quiz
              </Button>
            </div>

            {/* Right Content - Illustration */}
            <div className="flex justify-center">
              <img 
                src={quizIllustration} 
                alt="Quiz Illustration" 
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quizzes Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">QUIZZES</h2>
          </div>

          {/* Quiz Cards Grid */}
          {loading && <SkeletonList count={3} />}
          
          {!loading && quizzesData && quizzesData.content.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzesData.content.map((quiz, index) => (
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
          )}
          
          {!loading && (!quizzesData || quizzesData.content.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-600">No quizzes available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
