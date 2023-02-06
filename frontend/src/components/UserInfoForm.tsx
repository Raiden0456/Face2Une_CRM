import React, { useState } from 'react';
import { ButtonContained } from './base/Button';
import { Input, NumberInput } from './base/Input';
import PersonalAgreement from './PersonalAgreement';

import s from './UserInfoForm.scss';

export const UserInfoForm = ({ inputs, handleChange, handleNumberChange, handleSubmit }: any) => {
  const [phoneError, setPhoneError] = useState<boolean>(false);

  return (
    <div className={s.UserInfoForm}>
      <form
        id="userInfo"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          !phoneError && handleSubmit();
        }}
      >
        <div className={s.UserInfoForm__inputs}>
          <Input
            required
            className={s.Input}
            name="firstName"
            label="First Name:"
            type="text"
            value={inputs?.firstName}
            onChange={handleChange}
          />
          <br />
          <Input
            required
            className={s.Input}
            name="lastName"
            label="Last Name:"
            type="text"
            value={inputs?.lastName}
            onChange={handleChange}
          />
          <br />
          <NumberInput
            error={phoneError}
            helperText={phoneError && 'Your phone number is not valid!'}
            numberFormat="+# (###) ###-##-##"
            type="tel"
            className={s.Input}
            onBlur={() => (inputs?.phone.length === 11 ? setPhoneError(false) : setPhoneError(true))}
            required
            label="Phone:"
            name="phone"
            value={inputs?.phone}
            onChange={(e) => handleNumberChange(e, 'phone')}
          />
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
          Proceed
        </ButtonContained>
      </form>
    </div>
  );
};

export default UserInfoForm;
