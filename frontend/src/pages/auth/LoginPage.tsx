import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ROUTES } from '@/constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement login logic with API
    console.log('Login:', { username, password });
    
    // Mock delay
    setTimeout(() => {
      setIsLoading(false);
      // navigate(ROUTES.HOME);
    }, 1000);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Login Card */}
      <div className="relative z-10 bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <div className="flex gap-3 mb-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(ROUTES.HOME)}
              className="flex-1"
            >
              Back to Home
            </Button>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="flex-1"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="text-center space-y-2">
          <Link
            to="/auth/forgot-password"
            className="block text-sm text-gray-600 hover:text-primary transition-colors"
          >
            Forgot password?
          </Link>
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/auth/register"
              className="text-primary hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
