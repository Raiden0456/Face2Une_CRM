import React from 'react';
import classNames from 'classnames';

import s from './Button.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  width?: string;
  disabled?: boolean;
  className?: string;
}

export const ButtonContained: React.FC<IButton> = ({
  children,
  onClick,
  width,
  disabled = false,
  className,
  ...shared
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(s.ButtonContained, className)}
      style={width ? { width } : { width: '100%' }}
      {...shared}
    >
      {children}
    </button>
  );
};

ButtonContained.defaultProps = {
  type: 'button',
};

export const ButtonOutlined: React.FC<IButton> = ({
  children,
  onClick,
  width,
  disabled = false,
  className,
  ...shared
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(s.ButtonOutlined, className)}
      style={width ? { width } : { width: '100%' }}
      {...shared}
    >
      {children}
    </button>
  );
};

ButtonOutlined.defaultProps = {
  type: 'button',
};

export const ButtonDelete: React.FC<IButton> = ({
  children,
  onClick,
  width,
  disabled = false,
  className,
  ...shared
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(s.ButtonDelete, className)}
      style={width ? { width } : { width: '100%' }}
      {...shared}
    >
      {children}
    </button>
  );
};

ButtonDelete.defaultProps = {
  type: 'button',
};

export const ButtonEdit: React.FC<IButton> = ({
  children,
  onClick,
  width,
  disabled = false,
  className,
  ...shared
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(s.ButtonEdit, className)}
      style={width ? { width } : { width: '100%' }}
      {...shared}
    >
      {children}
    </button>
  );
};

ButtonEdit.defaultProps = {
  type: 'button',
};

export const ButtonDanger: React.FC<IButton> = ({
  children,
  onClick,
  width,
  disabled = false,
  className,
  ...shared
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(s.ButtonDanger, className)}
      style={width ? { width } : { width: '100%' }}
      {...shared}
    >
      {children}
    </button>
  );
};

ButtonDanger.defaultProps = {
  type: 'button',
};
