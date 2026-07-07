import React, { useState } from 'react';
import { COLORS } from '../../../constants/colors';
import { SPACING } from '../../../constants/spacing';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  error = false,
  errorMessage,
  label,
  className = '',
  style,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.xs,
    width: '100%',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: `${SPACING.sm} ${SPACING.md}`,
    fontSize: '0.875rem',
    borderRadius: '0.75rem',
    border: `1px solid ${error ? COLORS.danger.DEFAULT : isFocused ? COLORS.primary.DEFAULT : COLORS.border}`,
    backgroundColor: COLORS.background.paper,
    color: COLORS.text.primary,
    outline: 'none',
    boxShadow: isFocused ? `0 0 0 2px ${COLORS.primary.light}` : 'none',
    transition: 'all 0.2s ease-in-out',
    ...style,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: error ? COLORS.danger.DEFAULT : COLORS.text.secondary,
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        ref={ref}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`focus:ring-2 focus:ring-offset-2 ${className}`}
        {...props}
      />
      {error && errorMessage && (
        <span style={{ fontSize: '0.75rem', color: COLORS.danger.DEFAULT, marginTop: '2px' }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
