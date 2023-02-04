import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { ButtonContained } from '../../components/base/Button';
import { Container } from '../../components/base/Container';
import { Input } from '../../components/base/Input';
import { AuthService } from '../../service/AuthService';
import NavBar from '../../components/Navbar';
import { IconEyeClosed, IconEyeOpened } from '../../assets/svg';
import useForm from '../../utils/useForm';

import s from './SignIn.scss';

const SignIn = observer(({ mobile }: { mobile: boolean }) => {
  const { inputs, handleChange, handleNumberChange, clearForm, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [hidePassword, setHidePassword] = useState(false);
  const authService = new AuthService();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputs);
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
          <form id="myform" className={s.SignIn__content} onSubmit={onSubmit}>
            <h2>Welcome back!</h2>
            <Input
              required
              className={s.Input}
              name="email"
              label="Email"
              type="text"
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

            <ButtonContained width="35%" className={s.SignIn__bottom} type="submit" form="myform" value="Update">
              Sign In
            </ButtonContained>
          </form>
        }
      />
    </>
  );
});

export default SignIn;
