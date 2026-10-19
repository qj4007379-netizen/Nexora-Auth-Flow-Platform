import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-medium text-slate-300 mb-2'>
            {label}
          </label>
        )}
        <div className='relative'>
          {icon && (
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={showPasswordToggle && showPassword ? 'text' : type}
            className={cn(
              'w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder:text-slate-500',
              'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
              'transition-all duration-200',
              icon && 'pl-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {showPasswordToggle && type === 'password' && (
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors'
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className='mt-1 text-xs text-red-400'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
