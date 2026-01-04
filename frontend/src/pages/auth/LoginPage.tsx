import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from 'react-hot-toast';
import AuthLayout from '@/layouts/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ROUTES } from '@/constants';
import { loginSchema, type LoginFormData } from '@/schemas/formSchemas';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      // Navigation will be handled by useAuth hook
    } catch (error) {
      // Error handling is done in useAuth and axios interceptor
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <AuthLayout>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            autoComplete="email"
            {...register('email')}
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
              onClick={() => window.location.href = ROUTES.HOME}
              className="flex-1"
              disabled={isLoading}
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
    </>
  );
};

export default LoginPage;
