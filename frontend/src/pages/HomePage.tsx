import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import QuizCard from '@/components/QuizCard';
import Button from '@/components/Button';
import quizIllustration from '@/assets/images/quiz-bg-01.png';
import map1 from '@/assets/images/map.png';
import map2 from '@/assets/images/map2.png';
import map3 from '@/assets/images/map3.png';

const HomePage = () => {
  const navigate = useNavigate();

  // Sample quiz data
  const quizzes = [
    {
      id: '1',
      title: 'Capitals of Country',
      description: 'Test your knowledge of country capitals',
      duration: '15m',
      difficulty: 'Easy',
      thumbnail: map1,
    },
    {
      id: '2',
      title: 'Capitals of Country',
      description: 'Test your knowledge of country capitals',
      duration: '15m',
      difficulty: 'Medium',
      thumbnail: map2,
    },
    {
      id: '3',
      title: 'Capitals of Country',
      description: 'Test your knowledge of country capitals',
      duration: '15m',
      difficulty: 'Hard',
      thumbnail: map3,
    },
  ];

  const handleStartQuiz = (quizId: string) => {
    console.log('Starting quiz:', quizId);
    // Navigate to quiz page
    navigate(`/quizzes/${quizId}`);
  };

  const handleTakeQuiz = () => {
    navigate('/quizzes');
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
    </MainLayout>
  );
};

export default HomePage;
