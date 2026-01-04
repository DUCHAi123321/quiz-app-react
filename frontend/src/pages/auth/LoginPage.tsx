import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import AuthLayout from '@/layouts/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ROUTES } from '@/constants';
import { loginSchema, type LoginFormData } from '@/schemas/formSchemas';
import { useAuthContext } from '@/contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthContext();

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
      toast.success('Login successful!');
      
      // Get updated user from localStorage after login
      const savedUser = localStorage.getItem('user');
      const loggedInUser = savedUser ? JSON.parse(savedUser) : null;
      
      // Redirect based on user role
      if (loggedInUser?.roles.includes('ADMIN')) {
        navigate('/management');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
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
              onClick={() => navigate(ROUTES.HOME)}
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
