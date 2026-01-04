import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from 'react-hot-toast';
import AuthLayout from '@/layouts/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ROUTES } from '@/constants';
import { registerSchema, type RegisterFormData } from '@/schemas/formSchemas';
import { useAuth } from '@/hooks/useAuth';

const RegisterPage = () => {
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      // Navigation will be handled by useAuth hook
    } catch (error) {
      // Error handling is done in useAuth and axios interceptor
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <AuthLayout>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Address - full width */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            autoComplete="email"
            {...register('email')}
          />

          {/* Full Name - full width */}
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            autoComplete="name"
            {...register('fullName')}
          />

          {/* Password - full width */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            autoComplete="new-password"
            {...register('password')}
          />

          {/* Confirm Password - full width */}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
            {...register('confirmPassword')}
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
              Register
            </Button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
