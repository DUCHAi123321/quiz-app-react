import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '@/layouts/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ROUTES } from '@/constants';
import { loginSchema, type LoginFormData } from '@/schemas/formSchemas';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // TODO: Implement login logic with API
    console.log('Login:', data);
    
    // Mock delay
    setTimeout(() => {
      setIsLoading(false);
      // navigate(ROUTES.HOME);
    }, 1000);
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Login
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          error={errors.username?.message}
          autoComplete="username"
          {...register('username')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          autoComplete="current-password"
          {...register('password')}
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
    </AuthLayout>
  );
};

export default LoginPage;
