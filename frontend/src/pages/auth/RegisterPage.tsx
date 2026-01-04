import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '@/layouts/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ROUTES } from '@/constants';
import { registerSchema, type RegisterFormData } from '@/schemas/formSchemas';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    // TODO: Implement register logic with API
    console.log('Register:', data);

    // Mock delay
    setTimeout(() => {
      setIsLoading(false);
      // navigate(ROUTES.LOGIN);
    }, 1000);
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Register
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name & Last Name - 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            error={errors.firstName?.message}
            autoComplete="given-name"
            {...register('firstName')}
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            error={errors.lastName?.message}
            autoComplete="family-name"
            {...register('lastName')}
          />
        </div>

        {/* Email Address - full width */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          autoComplete="email"
          {...register('email')}
        />

        {/* Username & Phone Number - 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            error={errors.username?.message}
            autoComplete="username"
            {...register('username')}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            error={errors.phoneNumber?.message}
            autoComplete="tel"
            {...register('phoneNumber')}
          />
        </div>

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
  );
};

export default RegisterPage;
