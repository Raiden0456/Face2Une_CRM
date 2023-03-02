import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { ButtonContained, ButtonOutlined } from '../../components/base/Button';
import { Container } from '../../components/base/Container';
import { Input } from '../../components/base/Input';
import { AuthService } from '../../service/AuthService';
import NavBar from '../../components/Navbar';
import { IconEyeClosed, IconEyeOpened } from '../../assets/svg';
import useForm from '../../utils/useForm';
import { Link } from 'react-router-dom';

import s from './SignIn.scss';

const SignIn = observer(({ mobile }: { mobile: boolean }) => {
  const { inputs, handleChange, handleNumberChange, clearForm, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [hidePassword, setHidePassword] = useState(false);
  const [err, setError] = useState({ status: false, message: '' });
  const [loader, setLoader] = useState(false);
  const authService = new AuthService();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setError({ status: false, message: '' });
    console.log(inputs);
    authService.signIn(inputs).then((r) => {
      setLoader(false);
      if (!r.success) {
        setError({ status: true, message: r.message });
      }
    });
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
            {err.status && <p className={s.SignIn_content_error}>{err.message}</p>}

            <Input
              required
              className={s.Input}
              name="email"
              label="Email:"
              type="text"
              value={inputs?.email}
              onChange={handleChange}
            />
            <Input
              required
              className={s.Input}
              name="password"
              label="Password:"
              endIcon={!hidePassword ? <IconEyeClosed /> : <IconEyeOpened />}
              onIconClick={handlePassword}
              type={hidePassword ? 'text' : 'password'}
              value={inputs?.password}
              onChange={handleChange}
            />

            <div className={s.SignIn__bottom}>
              <ButtonContained disabled={loader} width="200px" type="submit" form="myform" value="Update">
                Sign In
              </ButtonContained>
              <Link to="/auth/Signup" style={{ textDecoration: 'none', textAlign: 'center', width: '200px' }}>
                <ButtonOutlined disabled={loader} width="100%" type="button">
                  Not registered yet?
                </ButtonOutlined>
              </Link>
              <Link to="/" style={{ textAlign: 'center', width: '200px', color: '#8e8e93' }}>
                Home page
              </Link>
            </div>
          </form>
        }
      />
    </>
  );
});

export default SignIn;
