import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { ButtonContained } from '../../components/base/Button';
import { Container } from '../../components/base/Container';
import { Input } from '../../components/base/Input';
import { AuthService } from '../../service/AuthService';
import NavBar from '../../components/Navbar';
import { IconEyeClosed, IconEyeOpened } from '../../assets/svg';

import s from './SignIn.scss';

const SignIn = observer(({ mobile }: { mobile: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(false);
  const authService = new AuthService();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      authService.signIn();
    }
  };

  const handlePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      <Container
        /* header={mobile ? <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>Mobile</div> : <NavBar />} */
        width="100%"
        content={
          <form id="myform" className={s.SignIn__content} onSubmit={onSubmit}>
            <h2>Welcome back!</h2>
            <Input
              required
              className={s.Input}
              name="email"
              label="Email"
              type="text"
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
          </form>
        }
        bottom={
          <ButtonContained width="35%" className={s.SignIn__bottom} type="submit" form="myform" value="Update">
            LogIn
          </ButtonContained>
        }
      />
    </>
  );
});

export default SignIn;
