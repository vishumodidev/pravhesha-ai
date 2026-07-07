import React from 'react';
import { COLORS } from '../../../constants/colors';
import type { ComponentVariant } from '../../../types/component.types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ComponentVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'primary',
  children,
  className = '',
  style,
  ...props
}, ref) => {
  let bgColor = COLORS.primary.light;
  let textColor = COLORS.primary.DEFAULT;

  if (variant === 'secondary') {
    bgColor = COLORS.secondary.light;
    textColor = COLORS.secondary.DEFAULT;
  } else if (variant === 'success') {
    bgColor = COLORS.success.light;
    textColor = COLORS.success.DEFAULT;
  } else if (variant === 'warning') {
    bgColor = COLORS.warning.light;
    textColor = COLORS.warning.DEFAULT;
  } else if (variant === 'danger') {
    bgColor = COLORS.danger.light;
    textColor = COLORS.danger.DEFAULT;
  } else if (variant === 'info') {
    bgColor = COLORS.info.light;
    textColor = COLORS.info.DEFAULT;
  } else if (variant === 'outline') {
    bgColor = 'transparent';
    textColor = COLORS.text.primary;
    style = { border: `1px solid ${COLORS.border}`, ...style };
  } else if (variant === 'ghost') {
    bgColor = 'transparent';
    textColor = COLORS.text.primary;
  }

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.625rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    borderRadius: '9999px',
    backgroundColor: bgColor,
    color: textColor,
    ...style,
  };

  return (
    <span
      ref={ref}
      style={badgeStyle}
      className={`select-none ${className}`}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
