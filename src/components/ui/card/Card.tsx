import React from 'react';
import { COLORS } from '../../../constants/colors';
import { SPACING } from '../../../constants/spacing';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  bordered = true,
  children,
  className = '',
  style,
  ...props
}, ref) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: COLORS.background.paper,
    border: bordered ? `1px solid ${COLORS.border}` : 'none',
    borderRadius: '1rem', // 16px
    padding: SPACING.md,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
    ...style,
  };

  return (
    <div
      ref={ref}
      style={cardStyle}
      className={`shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
