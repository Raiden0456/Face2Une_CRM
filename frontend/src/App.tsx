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
import { Coupons } from './pages/Coupons';
import { ConfirmationPackage } from './pages/ConfirmationPackage';
import { Calendar } from './pages/Calendar';
import { Employees } from './pages/Employees';
import { ProceduresService } from './service/ProceduresService';
import { ProceduresStore } from './store/Procedures.store';
import { ConfirmationCertificate } from './pages/ConfirmationCertificate';
import { Scheduling } from './pages/Scheduling';
import { ModalStore } from './store/Modal.store';
import { Summary } from './pages/Summary';
import { StatusPage } from './pages/StatusPage';
//
require('./App.scss');

const App = observer(() => {
  const proceduresService = new ProceduresService();
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const authService = new AuthService();

  // Check if saloon is specified, then fetch the main data
  useEffect(() => {
    // Fetch all the proc-s and save to the store
    async function fetchData() {
      setLoading(true);
      const [optionalProcedures, procedures, packages, certificates] = await Promise.all([
        proceduresService.getOptionalProcedures(),
        proceduresService.getProcedures(),
        proceduresService.getPackages(),
        proceduresService.getCertificates(),
      ]);

      ProceduresStore.setProceduresStatus({
        optionalProceduresData: optionalProcedures.data,
        proceduresData: procedures.data,
        packagesData: packages.data,
        certificatesData: certificates.data,
      });

      setLoading(false);
    }

    // First we fetch existing sallons and check if there is a saloonID in localStorage
    proceduresService.getSaloons().then((r) => {
      if (r.success) {
        ProceduresStore.setSaloonsStatus({ saloonsData: r.data });

        if (!localStorage.getItem('saloon')) {
          // Open the select saloon modal
          ModalStore.setModalStatus({ open: true, action: 'selectSaloon', redirectUrl: '/' });
        }
        // If there is a saloonID in localStorage, we fetch the data
        fetchData();
      }
    });
  }, []);

  // Check user authorization
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

            <Route path="/" element={<Home loading={loading} />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/confirmation-package" element={<ConfirmationPackage />} />
            <Route path="/confirmation-certificate" element={<ConfirmationCertificate />} />
            <Route path="/success" element={<StatusPage type="success" />} />
            <Route path="/error" element={<StatusPage type="error" />} />
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/employees" element={<Employees />} />
            </Route>
            <Route element={<PrivateRouteAdminOrEmployee />}>
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/clients" element={<Summary />} />
            </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
});
export default App;
