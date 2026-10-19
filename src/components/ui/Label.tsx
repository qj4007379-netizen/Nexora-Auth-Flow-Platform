import React from 'react';
import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium text-slate-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className='text-red-400 ml-1'>*</span>}
    </label>
  )
);

Label.displayName = 'Label';

export { Label };
