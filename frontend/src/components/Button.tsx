import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { BUTTON_STYLES } from '@/constants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_STYLES;
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconAlt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ 
  variant = 'primary', 
  children, 
  fullWidth = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  iconAlt = '',
  size = 'md',
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const sizeStyles = {
    sm: 'py-1.5 px-4 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6',
  };

  const iconSizeStyles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const baseStyles = 'font-medium rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const widthStyles = fullWidth ? 'w-full justify-center' : '';
  const variantStyles = BUTTON_STYLES[variant];

  const iconFilter = variant === 'primary' ? 'brightness-0 invert' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles[size]} ${widthStyles} ${className}`.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className={`inline-block ${iconSizeStyles[size]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`}></span>
          Loading...
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <img src={icon} alt={iconAlt} className={`${iconSizeStyles[size]} ${iconFilter}`} />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <img src={icon} alt={iconAlt} className={`${iconSizeStyles[size]} ${iconFilter}`} />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
