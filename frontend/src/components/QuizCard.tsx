interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  thumbnail: string;
  onStart: () => void;
}

const QuizCard = ({ title, description, duration, difficulty, thumbnail, onStart }: QuizCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Duration */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500">{duration}</span>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-2">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-300"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
