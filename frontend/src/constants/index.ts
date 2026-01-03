// Button variants and styles
import johnDAvatar from '@/assets/images/JohnD.png';
import janeAvatar from '@/assets/images/Jane.png';
import johnSAvatar from '@/assets/images/JohnS.png';

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
  MANAGEMENT: '/management',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  ADMIN_DASHBOARD: '/admin/dashboard',
  FORBIDDEN: '/forbidden',
} as const;

// Contact Info
export const CONTACT_INFO = {
  email: 'quizapp2023@gmail.com',
  phone: '+84 904 111 456',
  address: '123 Xuan Dieu, Bac Tu Liem, Ha Noi, Viet Nam',
} as const;

// Team Members
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Front End Developer',
    avatar: johnDAvatar,
  },
  {
    id: 2,
    name: 'Jane Doe',
    role: 'Back End Developer',
    avatar: janeAvatar,
  },
  {
    id: 3,
    name: 'John Smith',
    role: 'Full Stack Developer',
    avatar: johnSAvatar,
  },
] as const;
