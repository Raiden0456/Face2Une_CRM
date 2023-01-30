import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { ButtonContained } from '../../components/base/Button';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import s from './MainAuth.scss';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { AuthStore } from '../../store/Auth.store';

const MainAuth = observer(({ mobile }: { mobile: boolean }) => {
  const navigate = useNavigate();
  const location: any = useLocation();

  useEffect(() => {
    if (AuthStore.authorized === 'auth') {
      location.state?.redirectUrl
        ? navigate(`${location.state.redirectUrl.pathname}${location.state?.redirectUrl?.search}`)
        : navigate('/');
    }
  }, [AuthStore.authorized]);

  return (
    <>
      <Routes>
        <Route path="/signIn" element={<SignIn mobile={mobile} />} />
        <Route path="/signUp" element={<SignUp mobile={mobile} />} />
      </Routes>
    </>
  );
});
export default MainAuth;
