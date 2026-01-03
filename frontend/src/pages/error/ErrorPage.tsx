import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { ROUTES } from '@/constants';

interface ErrorPageProps {
  errorCode: '403' | '404';
  title: string;
  message: string;
  buttonText?: string;
}

const ErrorPage = ({ errorCode, title, message, buttonText = 'Back to Home' }: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <main 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
      aria-labelledby="error-title"
    >
      {/* Error Card */}
      <div className="relative z-10 bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h1 id="error-title" className="text-4xl font-bold text-gray-800 mb-4">
          {errorCode} - {title}
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>
        <Button
          onClick={() => navigate(ROUTES.HOME)}
          fullWidth
          aria-label="Navigate back to home page"
        >
          {buttonText}
        </Button>
      </div>
    </main>
  );
};

export default ErrorPage;
