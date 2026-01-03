import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import QuizCard from '@/components/QuizCard';
import Button from '@/components/Button';
import map1 from '@/assets/images/map..png';
import map2 from '@/assets/images/map2..png';
import map3 from '@/assets/images/map3..png';

const QuizzesPage = () => {
  const navigate = useNavigate();
  const [quizCode, setQuizCode] = useState('');

  // Sample quiz data
  const quizzes = [
    {
      id: '1',
      title: 'Capitals of Country',
      description: 'Test your knowledge of country capitals',
      duration: '15m',
      thumbnail: map1,
    },
    {
      id: '2',
      title: 'Capitals of Country',
      description: 'Test your knowledge of country capitals',
      duration: '15m',
      thumbnail: map2,
    },
    {
      id: '3',
      title: 'Capitals of Country',
      description: 'Test your knowledge of country capitals',
      duration: '15m',
      thumbnail: map3,
    },
  ];

  const handleStartQuiz = (quizId: string) => {
    console.log('Starting quiz:', quizId);
    navigate(`/quizzes/${quizId}`);
  };

  const handleTakeQuizByCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizCode.trim()) {
      console.log('Taking quiz with code:', quizCode);
      navigate(`/quizzes/${quizCode}`);
    }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  {...quiz}
                  onStart={() => handleStartQuiz(quiz.id)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default QuizzesPage;
