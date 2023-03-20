import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AuthStore } from '../store/Auth.store';
import { TailSpinFixed } from '../components/TailSpin';

// Private Route Middleware
export const PrivateRouteAdmin = observer(() => {
  const location = useLocation();

  return (
    <>
      {AuthStore.authorized === 'auth' && AuthStore.rights === 'admin' && <Outlet />}
      {AuthStore.authorized === 'not_auth' && <Navigate state={{ redirectUrl: location }} to="/" />}
      {!AuthStore.authorized || (AuthStore.authorized === 'check_auth' && <TailSpinFixed />)}
    </>
  );
});

export const PrivateRouteAdminOrEmployee = observer(() => {
  const location = useLocation();

  return (
    <>
      {AuthStore.authorized === 'auth' && (AuthStore.rights === 'employee' || AuthStore.rights === 'admin') && (
        <Outlet />
      )}
      {AuthStore.authorized === 'not_auth' && <Navigate state={{ redirectUrl: location }} to="/" />}
      {!AuthStore.authorized || (AuthStore.authorized === 'check_auth' && <TailSpinFixed />)}
    </>
  );
});
