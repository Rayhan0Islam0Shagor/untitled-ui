import React from 'react';
import { type LucideIcon } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = [
    'inline-flex cursor-pointer items-center justify-center font-medium rounded-lg',
    'transition-all duration-200 ease-in-out',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'select-none',
  ].join(' ');

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  const variantClasses = {
    filled: [
      'bg-violet-600 text-white shadow-sm',
      'hover:bg-violet-700 hover:shadow-md',
      'focus:ring-violet-500',
      'active:bg-violet-800',
    ].join(' '),
    ghost: [
      'bg-transparent text-gray-700',
      'hover:bg-gray-100 hover:text-gray-900',
      'focus:ring-gray-500',
      'active:bg-gray-200',
    ].join(' '),
    outline: [
      'bg-transparent border border-gray-300 text-gray-700',
      'hover:bg-gray-50 hover:border-gray-400',
      'focus:ring-gray-500',
      'active:bg-gray-100',
    ].join(' '),
  };

  const combinedClasses = [
    baseClasses,
    sizeClasses[size],
    className || variantClasses[variant],
  ].join(' ');

  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="animate-spin rounded-full border-2 border-current border-t-transparent w-4 h-4" />
          {children && <span>Loading...</span>}
        </>
      );
    }

    if (Icon && children) {
      return iconPosition === 'left' ? (
        <>
          <Icon size={iconSize[size]} />
          <span>{children}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <Icon size={iconSize[size]} />
        </>
      );
    }

    if (Icon && !children) {
      return <Icon size={iconSize[size]} />;
    }

    return children;
  };

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
