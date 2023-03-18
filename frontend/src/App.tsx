import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import MainAuth from './pages/Auth/MainAuth';
import MainLayout from './layer/MainLayout';
import { PrivateRouteAdmin, PrivateRouteAdminOrEmployee } from './layer/PrivateRoute';
import { AuthService } from './service/AuthService';
import { AuthStore } from './store/Auth.store';
import { WIDTH_QUERY } from './const/widthQuery';
import { Home } from './pages/Home';
import { UserInfo } from './pages/UserInfo';
import { Confirmation } from './pages/Confirmation';
import { Clients } from './pages/Clients';
import { Coupons } from './pages/Coupons';
import { ConfirmationPackage } from './pages/ConfirmationPackage';
import { Calendar } from './pages/Calendar';
import { Employees } from './pages/Employees';
import { ProceduresService } from './service/ProceduresService';
import { ProceduresStore } from './store/Procedures.store';
//
require('./App.scss');

const App = observer(() => {
  const proceduresService = new ProceduresService();
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const authService = new AuthService();

  useEffect(() => {
    if (!AuthStore.authorized) {
      authService.getUser();
    }

    if (AuthStore.authorized === 'auth') {
      console.log("You're Authorized");
    }
  }, [AuthStore.authorized]);

  // Fetch and Store Main & Optional Procedures
  useEffect(() => {
    setLoading(true);
    proceduresService.getOptionalProcedures().then((optionalProcedures) => {
      if (optionalProcedures?.success) {
        ProceduresStore.setProceduresStatus({
          ...ProceduresStore.proceduresStatus,
          optionalProceduresData: optionalProcedures.data,
        });
      }

      proceduresService.getProcedures().then((procedures) => {
        if (procedures?.success) {
          ProceduresStore.setProceduresStatus({
            ...ProceduresStore.proceduresStatus,
            proceduresData: procedures.data,
          });
        }

        proceduresService.getPackages().then((packages) => {
          if (packages?.success) {
            ProceduresStore.setProceduresStatus({
              ...ProceduresStore.proceduresStatus,
              packagesData: packages.data,
            });
            setLoading(false);
          }
        });
      });
    });
  }, []);

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

            <Route path="/" element={<Home loading={loading} />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/confirmation-package" element={<ConfirmationPackage />} />
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/clients" element={<Clients />} />
              <Route path="/employees" element={<Employees />} />
            </Route>
            <Route element={<PrivateRouteAdminOrEmployee />}>
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/calendar" element={<Calendar />} />
            </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
});
export default App;
