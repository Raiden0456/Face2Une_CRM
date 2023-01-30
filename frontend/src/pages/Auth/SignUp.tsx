import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { ButtonContained } from '../../components/base/Button';
import { Container } from '../../components/base/Container';
import { Input } from '../../components/base/Input';
import { AuthService } from '../../service/AuthService';
import NavBar from '../../components/Navbar';
import { IconEyeClosed, IconEyeOpened } from '../../assets/svg';

import s from './SignUp.scss';
import { Link } from 'react-router-dom';

const SignUp = observer(({ mobile }: { mobile: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(false);
  const [passwordCompareError, setPasswordCompareError] = useState(false);
  const authService = new AuthService();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      <Container
        width="100%"
        content={
          <form id="myform" className={s.SignUp__content} onSubmit={onSubmit}>
            <Input
              required
              className={s.Input}
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              required
              className={s.Input}
              name="password"
              label="Password"
              endIcon={!hidePassword ? <IconEyeClosed /> : <IconEyeOpened />}
              onIconClick={handlePassword}
              type={hidePassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Input
              required
              className={s.Input}
              error={passwordCompareError}
              helperText={passwordCompareError && 'Passwords must match!'}
              name="confirm_password"
              label="Confirm Password"
              endIcon={!hidePassword ? <IconEyeClosed /> : <IconEyeOpened />}
              onIconClick={handlePassword}
              type={hidePassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) =>
                e.target.value !== password ? setPasswordCompareError(true) : setPasswordCompareError(false)
              }
            />
          </form>
        }
        bottom={
          <ButtonContained width="35%" type="submit" form="myform" value="Update" className={s.SignUp__bottom}>
            Sign Up
          </ButtonContained>
        }
      />
    </>
  );
});

export default SignUp;
