import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { BUTTON_STYLES } from '@/constants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_STYLES;
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({ 
  variant = 'primary', 
  children, 
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'font-semibold py-3 px-6 rounded-md transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed';
  const widthStyles = fullWidth ? 'w-full' : '';
  const variantStyles = BUTTON_STYLES[variant];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
