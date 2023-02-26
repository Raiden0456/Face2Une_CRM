import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AuthStore } from '../store/Auth.store';

// Private Route Middleware
export const PrivateRouteAdmin = observer(() => {
  const location = useLocation();

  return (
    <>
      {AuthStore.authorized === 'auth' && <Outlet />}
      {AuthStore.authorized === 'not_auth' ||
        (AuthStore.rights !== 'admin' && <Navigate state={{ redirectUrl: location }} to="/" />)}
      {!AuthStore.authorized || (AuthStore.authorized === 'check_auth' && 'Loading...')}
    </>
  );
});
