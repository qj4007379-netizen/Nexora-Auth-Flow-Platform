import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = 'default', title, children, dismissible, onDismiss, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(true);

    const variants = {
      default: {
        bg: 'bg-slate-800 border-slate-700',
        text: 'text-slate-300',
        icon: 'text-slate-400',
      },
      success: {
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        text: 'text-emerald-300',
        icon: 'text-emerald-400',
      },
      error: {
        bg: 'bg-red-500/10 border-red-500/30',
        text: 'text-red-300',
        icon: 'text-red-400',
      },
      warning: {
        bg: 'bg-amber-500/10 border-amber-500/30',
        text: 'text-amber-300',
        icon: 'text-amber-400',
      },
      info: {
        bg: 'bg-blue-500/10 border-blue-500/30',
        text: 'text-blue-300',
        icon: 'text-blue-400',
      },
    };

    const variant = variants[type];

    const icons = {
      default: <AlertCircle className={cn('h-5 w-5', variant.icon)} />,
      success: <CheckCircle className={cn('h-5 w-5', variant.icon)} />,
      error: <XCircle className={cn('h-5 w-5', variant.icon)} />,
      warning: <AlertCircle className={cn('h-5 w-5', variant.icon)} />,
      info: <Info className={cn('h-5 w-5', variant.icon)} />,
    };

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border p-4 flex gap-3',
          variant.bg,
          variant.text,
          className
        )}
        {...props}
      >
        <div className='flex-shrink-0 mt-0.5'>{icons[type]}</div>
        <div className='flex-1'>
          {title && <p className='font-semibold mb-1'>{title}</p>}
          <p className='text-sm'>{children}</p>
        </div>
        {dismissible && (
          <button
            onClick={() => {
              setIsOpen(false);
              onDismiss?.();
            }}
            className='flex-shrink-0 text-slate-400 hover:text-slate-300'
          >
            <XCircle className='h-5 w-5' />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
