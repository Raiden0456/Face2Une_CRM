import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import MainAuth from './pages/Auth/MainAuth';
import MainLayout from './layer/MainLayout';
import { PrivateRouteAdmin } from './layer/PrivateRoute';
import { AuthService } from './service/AuthService';
import { AuthStore } from './store/Auth.store';
import { WIDTH_QUERY } from './const/widthQuery';
import { Home } from './pages/Home';
import { UserInfo } from './pages/UserInfo';
import { Confirmation } from './pages/Confirmation';
import { Clients } from './pages/Clients';

require('./App.scss');

const App = observer(() => {
  const [mobile, setMobile] = useState(false);
  const authService = new AuthService();

  useEffect(() => {
    if (!AuthStore.authorized) {
      authService.getUser();
    }

    if (AuthStore.authorized === 'auth') {
      console.log("You're Authorized");
    }
  }, [AuthStore.authorized]);

  // Keep track of responsivness
  const calcWidth = () => {
    setMobile(window.innerWidth < WIDTH_QUERY.sm);
  };

  useEffect(() => {
    calcWidth();
    window.addEventListener('resize', calcWidth, true);
  }, [window.innerWidth]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout mobile={mobile}>
          <Routes>
            <Route path="/auth/*" element={<MainAuth mobile={mobile} />} />
            <Route path="*" element={<div>404 :(</div>} />

            <Route path="/" element={<Home />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/clients" element={<Clients />} />
            </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
});
export default App;
