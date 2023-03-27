import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';

import s from './SelectField.scss';

interface SelectFieldProps {
  name?: string;
  options: any;
  label?: string;
  disabled?: boolean;
  defaultValue?: any;
  required?: boolean;
  onChange?: (value: any) => void;
}

interface SelectProps {
  options: any[];
  value: any;
  onChange: (value: any) => void;
}

interface SelectNumberProps {
  max: number;
  min: number;
  value: number;
  onChange: (value: number) => void;
}

export const SelectField = ({
  name = 'baseSelect',
  options,
  disabled,
  defaultValue,
  label,
  required = false,
  onChange,
}: SelectFieldProps) => {
  return (
    <div className={classNames(name, s.SelectWrapper)}>
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        theme={(theme: any) => ({
          ...theme,
          spacing: {
            controlHeight: 16,
            baseUnit: 3,
            menuGutter: 1,
          },
          colors: {
            ...theme.colors,
            primary25: 'rgba(218,218,218,0.3)',
            primary: '#91a0db',
          },
        })}
        onChange={(e: any) => (onChange ? onChange(e) : '')}
        className="basic-single"
        classNamePrefix="select"
        defaultValue={defaultValue}
        isDisabled={disabled}
        name="color"
        required={required}
        options={options}
      />
    </div>
  );
};

export function Dropdown({ options, value, onChange }: SelectProps) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export function NumberDropdown(props: SelectNumberProps) {
  const { min, max, value, onChange } = props;
  const options = [];

  for (let i = min; i <= max; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }

  return (
    <select value={value} onChange={(event: any) => onChange(event.target.value)}>
      {options}
    </select>
  );
}
