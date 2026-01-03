// Button variants and styles
export const BUTTON_STYLES = {
  primary: 'bg-primary hover:bg-primary-hover text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
} as const;

// Error page messages
export const ERROR_MESSAGES = {
  404: {
    title: 'Page not found',
    message: 'The page you are looking for might have been removed had its name changed or is temporarily unavailable.',
    buttonText: 'Back to Home',
  },
  403: {
    title: 'Forbidden',
    message: "You don't have permission to access this page.",
    buttonText: 'Back to Home',
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  QUIZZES: '/quizzes',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  ADMIN_DASHBOARD: '/admin/dashboard',
  FORBIDDEN: '/forbidden',
} as const;
