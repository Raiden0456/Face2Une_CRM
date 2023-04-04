import React from 'react';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

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
  defaultValue?: string;
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
  defaultValue,
}) => {
  return (
    <div className={classNames(s.InputWrapper, className)}>
      <label htmlFor={className}>{label}</label>
      <NumberFormat
        value={defaultValue}
        className={error ? s.Input__Invalid : undefined}
        format={numberFormat}
        onValueChange={(values: any) => (onChange ? onChange(values) : '')}
        onBlur={onBlur}
      />
      {helperText && <small>{helperText}</small>}
    </div>
  );
};

export const PhoneInputStyled: React.FC<IInput> = ({
  onChange,
  onBlur,
  label,
  className,
  error,
  helperText,
  defaultValue,
}) => {
  return (
    <div className={classNames(s.InputWrapperPhone, className)}>
      <label htmlFor={className}>{label}</label>
      <PhoneInput
        required
        className={error ? s.PhoneInput_invalid : undefined}
        value={defaultValue}
        onChange={(values: any) => (onChange ? onChange(values) : '')}
        onBlur={onBlur}
      />
      {helperText && <small>{helperText}</small>}
    </div>
  );
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

Input.defaultProps = {
  type: 'text',
};
