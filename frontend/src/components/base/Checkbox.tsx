import React from 'react';
import classNames from 'classnames';

import s from './Checkbox.scss';

interface ICheckbox extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange(value: boolean | string): void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const Checkbox: React.FC<ICheckbox> = ({
  children,
  onChange,
  required = false,
  disabled = false,
  className,
  ...shared
}) => {
  return (
    <label className={classNames(s.CheckboxContainer, className)}>
      <input
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        {...shared}
        className={s.Checkbox}
      />
      <span>{children}</span>
    </label>
  );
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export const Radio: React.FC<ICheckbox> = ({ children, onChange, disabled = false, ...shared }) => {
  return (
    <label className={s.RadioContainer}>
      <input disabled={disabled} onChange={(e) => onChange(e.target.value)} {...shared} className={s.Radio} />
      <span>{children}</span>
    </label>
  );
};

Radio.defaultProps = {
  type: 'radio',
};
