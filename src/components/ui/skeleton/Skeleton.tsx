import React from 'react';
import { COLORS } from '../../../constants/colors';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({
  width = '100%',
  height = '1rem',
  circle = false,
  className = '',
  style,
  ...props
}, ref) => {
  const skeletonStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: circle ? '50%' : '0.5rem',
    backgroundColor: COLORS.secondary.light,
    ...style,
  };

  return (
    <div
      ref={ref}
      style={skeletonStyle}
      className={`animate-pulse ${className}`}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';
