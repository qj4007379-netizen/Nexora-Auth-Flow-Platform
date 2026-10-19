import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl active:from-blue-800 active:to-blue-900',
        secondary: 'bg-slate-700 text-white hover:bg-slate-800 shadow-md hover:shadow-lg active:bg-slate-900',
        outline: 'border border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500',
        ghost: 'text-slate-300 hover:text-white hover:bg-slate-800',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl active:bg-red-800',
      },
      size: {
        sm: 'text-xs px-3 py-1.5 h-8',
        md: 'text-sm px-4 py-2 h-10',
        lg: 'text-base px-6 py-3 h-12',
        xl: 'text-lg px-8 py-4 h-14',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      width: 'auto',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, width, isLoading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={isLoading || disabled}
      className={cn(buttonVariants({ variant, size, width }), className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className='h-4 w-4 animate-spin' />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
);

Button.displayName = 'Button';

export { Button, buttonVariants };
