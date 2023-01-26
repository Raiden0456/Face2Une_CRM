import React from 'react';
import { ButtonContained } from './base/Button';
import { Input } from './base/Input';
import PersonalAgreement from './PersonalAgreement';
import useForm from '../utils/useForm';

import s from './UserInfoForm.scss';

export const UserInfoForm = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({ name: '', phone: '', email: '' });
  return (
    <div className={s.UserInfoForm}>
      <form id="userInfo">
        <div className={s.UserInfoForm__inputs}>
          <Input required label="Your name:" type="text" name="name" value={inputs?.name} onChange={handleChange} />
          <br />
          <Input required label="Phone:" type="text" name="phone" value={inputs?.phone} onChange={handleChange} />
          <br />
          <Input
            autoComplete="email"
            required
            label="Email:"
            type="email"
            name="email"
            value={inputs?.email}
            onChange={handleChange}
          />
        </div>

        <PersonalAgreement />

        <ButtonContained type="submit" form="userInfo" style={{ margin: '1rem 0', minWidth: '100%' }}>
          Pay now
        </ButtonContained>
      </form>
    </div>
  );
};

export default UserInfoForm;
