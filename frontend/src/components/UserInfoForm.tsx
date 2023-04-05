import React, { useState } from 'react';
import { ButtonContained } from './base/Button';
import { Input, PhoneInputStyled } from './base/Input';
import PersonalAgreement from './PersonalAgreement';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

import s from './UserInfoForm.scss';

export const UserInfoForm = ({ inputs, handleChange, handleNumberChange, handleSubmit }: any) => {
  const [phoneError, setPhoneError] = useState<boolean>(false);

  return (
    <div className={s.UserInfoForm}>
      <form
        id="userInfo"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          isPossiblePhoneNumber(`+${inputs?.phone}`) && handleSubmit();
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
          <PhoneInputStyled
            defaultValue={`+${inputs?.phone}`}
            onChange={(e) => handleNumberChange(e, 'phone')}
            error={phoneError}
            label="Phone:"
            onBlur={() => (isPossiblePhoneNumber(`+${inputs?.phone}`) ? setPhoneError(false) : setPhoneError(true))}
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
