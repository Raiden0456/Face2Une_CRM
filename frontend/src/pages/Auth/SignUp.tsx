import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { ButtonContained, ButtonOutlined } from '../../components/base/Button';
import { Container } from '../../components/base/Container';
import { Input, NumberInput } from '../../components/base/Input';
import { AuthService } from '../../service/AuthService';
import NavBar from '../../components/Navbar';
import { IconEyeClosed, IconEyeOpened } from '../../assets/svg';
import useForm from '../../utils/useForm';
import { Link } from 'react-router-dom';

import s from './SignUp.scss';

const SignUp = observer(({ mobile }: { mobile: boolean }) => {
  const { inputs, handleChange, handleNumberChange, clearForm, resetForm } = useForm({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [passwordCompareError, setPasswordCompareError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [err, setError] = useState({ status: false, message: '' });
  const [success, setSuccess] = useState({ status: false, message: '' });
  const [loader, setLoader] = useState(false);
  const authService = new AuthService();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordCompareError && !phoneError) {
      setLoader(true);
      setError({ status: false, message: '' });
      setSuccess({ status: false, message: '' });
      console.log(inputs);
      authService.signUp(inputs).then((r) => {
        setLoader(false);
        if (!r.success) {
          setError({ status: true, message: r.message });
        } else {
          setSuccess({ status: true, message: 'Please, sign in to your account.' });
        }
      });
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
            <h2>Registration</h2>
            {err.status && <p className={s.SignUp_content_error}>{err.message}</p>}
            {success.status && <p className={s.SignUp_content_success}>{success.message}</p>}

            <Input
              required
              className={s.Input}
              name="firstName"
              label="First Name:"
              type="text"
              value={inputs?.firstName}
              onChange={handleChange}
            />
            <Input
              required
              className={s.Input}
              name="lastName"
              label="Last Name:"
              type="text"
              value={inputs?.lastName}
              onChange={handleChange}
            />
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
            <Input
              required
              className={s.Input}
              name="email"
              label="Email:"
              type="email"
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
            <Input
              required
              className={s.Input}
              error={passwordCompareError}
              helperText={passwordCompareError && 'Passwords must match!'}
              name="confirmPassword"
              label="Confirm Password:"
              endIcon={!hidePassword ? <IconEyeClosed /> : <IconEyeOpened />}
              onIconClick={handlePassword}
              type={hidePassword ? 'text' : 'password'}
              onBlur={(e) =>
                e.target.value !== inputs?.password ? setPasswordCompareError(true) : setPasswordCompareError(false)
              }
              value={inputs?.confirmPassword}
              onChange={handleChange}
            />

            <div className={s.SignUp__bottom}>
              <ButtonContained disabled={loader} width="35%" type="submit" form="myform" value="Update">
                Sign Up
              </ButtonContained>
              <Link to="/auth/Signin" style={{ textDecoration: 'none', textAlign: 'center', width: '35%' }}>
                <ButtonOutlined disabled={loader} width="100%" type="button">
                  Already registered?
                </ButtonOutlined>
              </Link>
            </div>
          </form>
        }
      />
    </>
  );
});

export default SignUp;
