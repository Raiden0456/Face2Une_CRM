import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { ButtonContained } from '../../components/base/Button';
import { Container } from '../../components/base/Container';
import { Input } from '../../components/base/Input';
import { AuthService } from '../../service/AuthService';
import NavBar from '../../components/Navbar';

import s from './SignIn.scss';

const SignIn = observer(({ mobile }: { mobile: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authService = new AuthService();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      authService.signIn();
    }
  };

  return (
    <>
      <Container
        className={s.SignIn}
        header={mobile ? <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>Mobile</div> : <NavBar />}
        content={
          <form id="myform" className={s.SignIn__content} onSubmit={onSubmit}>
            <Input
              required
              className={s.Input}
              name="email"
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e)}
            />
            <Input
              required
              className={s.Input}
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e)}
              value={password}
            />
          </form>
        }
        bottom={
          <ButtonContained className={s.SignIn__bottom} type="submit" form="myform" value="Update">
            LogIn
          </ButtonContained>
        }
      />
    </>
  );
});

export default SignIn;
