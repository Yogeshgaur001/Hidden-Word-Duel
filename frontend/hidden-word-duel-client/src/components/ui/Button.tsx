import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger'; // Add more as needed
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = "font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  let variantStyle = '';
  switch (variant) {
    case 'secondary':
      variantStyle = 'bg-secondary text-white hover:bg-green-500 focus:ring-green-400';
      break;
    case 'danger':
      variantStyle = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'primary':
    default:
      variantStyle = 'bg-primary text-white hover:bg-indigo-700 focus:ring-indigo-500';
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;