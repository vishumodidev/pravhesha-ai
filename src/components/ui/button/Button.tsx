import React, { useState } from 'react';
import { COLORS } from '../../../constants/colors';
import { SPACING } from '../../../constants/spacing';
import type { ComponentVariant, ComponentSize } from '../../../types/component.types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size mapping
  let sizeClasses = 'px-4 py-2 text-sm rounded-xl';
  if (size === 'sm') sizeClasses = 'px-3 py-1.5 text-xs rounded-lg';
  if (size === 'lg') sizeClasses = 'px-6 py-3 text-base rounded-2xl';

  // Variant color mapping from COLORS constant
  let baseColor = COLORS.primary.DEFAULT;
  let hoverColor = COLORS.primary.hover;
  let textColor = COLORS.text.white;
  let borderStyle = 'none';

  if (variant === 'secondary') {
    baseColor = COLORS.secondary.light;
    hoverColor = COLORS.secondary.hover + '1A'; // 10% opacity
    textColor = COLORS.secondary.DEFAULT;
  } else if (variant === 'success') {
    baseColor = COLORS.success.DEFAULT;
    hoverColor = COLORS.success.hover;
    textColor = COLORS.text.white;
  } else if (variant === 'warning') {
    baseColor = COLORS.warning.DEFAULT;
    hoverColor = COLORS.warning.hover;
    textColor = COLORS.text.white;
  } else if (variant === 'danger') {
    baseColor = COLORS.danger.DEFAULT;
    hoverColor = COLORS.danger.hover;
    textColor = COLORS.text.white;
  } else if (variant === 'info') {
    baseColor = COLORS.info.DEFAULT;
    hoverColor = COLORS.info.hover;
    textColor = COLORS.text.white;
  } else if (variant === 'outline') {
    baseColor = 'transparent';
    hoverColor = COLORS.secondary.light;
    textColor = COLORS.text.primary;
    borderStyle = `1px solid ${COLORS.border}`;
  } else if (variant === 'ghost') {
    baseColor = 'transparent';
    hoverColor = COLORS.secondary.light;
    textColor = COLORS.text.primary;
  }

  const customStyle: React.CSSProperties = {
    backgroundColor: isHovered && !disabled && !loading ? hoverColor : baseColor,
    color: textColor,
    border: borderStyle,
    gap: SPACING.xs,
    transition: 'all 0.2s ease-in-out',
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={customStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center font-bold disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer ${sizeClasses} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
