import React from 'react';
import { COLORS } from '../../../constants/colors';
import type { ComponentSize } from '../../../types/component.types';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ComponentSize;
  color?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({
  size = 'md',
  color = COLORS.primary.DEFAULT,
  className = '',
  style,
  ...props
}, ref) => {
  let dimension = '1.5rem'; // 24px
  if (size === 'sm') dimension = '1rem'; // 16px
  if (size === 'lg') dimension = '2.5rem'; // 40px

  const spinnerStyle: React.CSSProperties = {
    width: dimension,
    height: dimension,
    border: '2px solid rgba(0, 0, 0, 0.05)',
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
    ...style,
  };

  return (
    <div
      ref={ref}
      style={spinnerStyle}
      className={`animate-spin ${className}`}
      {...props}
    />
  );
});

Spinner.displayName = 'Spinner';
