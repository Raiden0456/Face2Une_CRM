import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { ButtonContained } from '../../components/base/Button';
import { Container } from '../../components/base/Container';
import { Input } from '../../components/base/Input';
import { AuthService } from '../../service/AuthService';
import NavBar from '../../components/Navbar';
import { IconEyeClosed, IconEyeOpened } from '../../assets/svg';
import useForm from '../../utils/useForm';

import s from './SignUp.scss';

const SignUp = observer(({ mobile }: { mobile: boolean }) => {
  const { inputs, handleChange, handleNumberChange, clearForm, resetForm } = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [passwordCompareError, setPasswordCompareError] = useState<boolean>(false);
  const authService = new AuthService();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordCompareError) {
      console.log(inputs);
    }
  };

  const handlePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      <Container
        width="100%"
        centeredContent
        content={
          <form id="myform" className={s.SignUp__content} onSubmit={onSubmit}>
            <h2>Please, register!</h2>
            <Input
              required
              className={s.Input}
              name="email"
              label="Email"
              type="email"
              value={inputs?.email}
              onChange={handleChange}
            />
            <Input
              required
              className={s.Input}
              name="password"
              label="Password"
              endIcon={!hidePassword ? <IconEyeClosed /> : <IconEyeOpened />}
              onIconClick={handlePassword}
              type={hidePassword ? 'text' : 'password'}
              value={inputs?.password}
              onChange={handleChange}
            />
            <Input
              required
              className={s.Input}
              error={passwordCompareError}
              helperText={passwordCompareError && 'Passwords must match!'}
              name="confirmPassword"
              label="Confirm Password"
              endIcon={!hidePassword ? <IconEyeClosed /> : <IconEyeOpened />}
              onIconClick={handlePassword}
              type={hidePassword ? 'text' : 'password'}
              onBlur={(e) =>
                e.target.value !== inputs?.password ? setPasswordCompareError(true) : setPasswordCompareError(false)
              }
              value={inputs?.confirmPassword}
              onChange={handleChange}
            />
            <ButtonContained width="35%" type="submit" form="myform" value="Update" className={s.SignUp__bottom}>
              Sign Up
            </ButtonContained>
          </form>
        }
      />
    </>
  );
});

export default SignUp;
