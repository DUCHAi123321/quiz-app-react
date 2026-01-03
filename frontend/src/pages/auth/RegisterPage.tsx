import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ROUTES } from '@/constants';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement register logic with API
    console.log('Register:', formData);

    // Mock delay
    setTimeout(() => {
      setIsLoading(false);
      // navigate(ROUTES.LOGIN);
    }, 1000);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Register Card */}
      <div className="relative z-10 bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          {/* First Name & Last Name - 2 columns */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              required
              autoComplete="given-name"
            />

            <Input
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              required
              autoComplete="family-name"
            />
          </div>

          {/* Email Address - full width */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange('email')}
            required
            autoComplete="email"
          />

          {/* Username & Phone Number - 2 columns */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange('username')}
              required
              autoComplete="username"
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange('phoneNumber')}
              required
              autoComplete="tel"
            />
          </div>

          {/* Password - full width */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange('password')}
            required
            autoComplete="new-password"
          />

          {/* Confirm Password - full width */}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            required
            autoComplete="new-password"
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
      </div>
    </main>
  );
};

export default RegisterPage;
