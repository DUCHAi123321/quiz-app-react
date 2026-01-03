interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  onStart: () => void;
}

const QuizCard = ({ title, description, duration, thumbnail, onStart }: QuizCardProps) => {
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
