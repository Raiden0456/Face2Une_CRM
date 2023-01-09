import React from 'react';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

import s from './Input.scss';

interface IInput extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string;
  label?: string;
  onChange?(value: any): void;
  onInput?(value: any): void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onIconClick?(value?: any): void;
  endIcon?: any;
  className?: string;
  error?: boolean | string;
  helperText?: string | boolean;
  numberFormat?: string;
  maxLength?: number;
  minLength?: number;
}

interface ITextArea extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
  value?: string;
  label?: string;
  onChange?(value: any): void;
  className?: string;
  error?: boolean | string;
  helperText?: string | boolean;
  maxLength?: number;
  minLength?: number;
  rows?: number;
}

export const Input: React.FC<IInput> = ({
  children,
  onChange,
  onIconClick,
  name,
  label,
  endIcon,
  className,
  error,
  onInput,
  maxLength,
  minLength,
  helperText,
  ...shared
}) => {
  return (
    <div className={classNames(s.InputWrapper, className)}>
      <label htmlFor={className}>{label}</label>
      <input
        name={name}
        maxLength={maxLength}
        minLength={minLength}
        className={error ? s.Input__Invalid : undefined}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => (onInput ? onInput(e.target) : '')}
        onChange={(e) => (onChange ? onChange(e) : '')}
        {...shared}
      />
      {helperText && <small>{helperText}</small>}
      <div onClick={onIconClick}>{endIcon}</div>
    </div>
  );
};

export const NumberInput: React.FC<IInput> = ({
  onChange,
  onBlur,
  name,
  label,
  className,
  error,
  helperText,
  numberFormat,
}) => {
  return (
    <div className={classNames(s.InputWrapper, className)}>
      <label htmlFor={className}>{label}</label>
      <NumberFormat
        className={error ? s.Input__Invalid : undefined}
        format={numberFormat}
        onValueChange={(values: any) => (onChange ? onChange(values.value) : '')}
        onBlur={onBlur}
      />
      {helperText && <small>{helperText}</small>}
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
};

export const TextArea: React.FC<ITextArea> = ({
  children,
  onChange,
  name,
  label,
  className,
  error,
  onInput,
  maxLength,
  minLength,
  helperText,
  rows,
  ...shared
}) => {
  return (
    <div className={classNames(s.InputWrapper, className)}>
      <label htmlFor={className}>{label}</label>
      <textarea
        name={name}
        rows={rows}
        maxLength={maxLength}
        minLength={minLength}
        className={error ? s.Input__Invalid : undefined}
        onChange={(e) => (onChange ? onChange(e) : '')}
        {...shared}
      />
      {helperText && <small>{helperText}</small>}
    </div>
  );
};
