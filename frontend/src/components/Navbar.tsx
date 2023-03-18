import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import s from './NavBar.scss';
import { AuthStore } from '../store/Auth.store';
import { AuthService } from '../service/AuthService';
import { Link } from 'react-router-dom';
import { ButtonOutlined } from './base/Button';

const adminPaths = ['/clients', '/calendar', '/employees', '/coupons'];

const NavBar = observer(() => {
  const authService = new AuthService();

  return (
    <div className={s.HeaderWrapper}>
      <div className={s.Navbar}>
        <div className={s.Navbar__header}>
          <div>{AuthStore.authorized === 'auth' && <p>{AuthStore.email}</p>}</div>
          <div className={s.Navbar__header_logo}>
            <Link to="/" style={{ textAlign: 'center', textDecoration: 'none', color: '#000' }}>
              Face2Une
            </Link>
          </div>
          <div>
            {window.location.pathname === '/' && AuthStore.authorized === 'auth' && (
              <button onClick={() => authService.signOut()}>Log Out</button>
            )}
            {window.location.pathname === '/' && AuthStore.authorized !== 'auth' && (
              <Link to="/auth/Signin" style={{ textAlign: 'center' }}>
                <p>Log In</p>
              </Link>
            )}
          </div>
        </div>

        {!adminPaths.includes(window.location.pathname) && (
          <div className={s.Navbar__pageStatus}>
            <div
              className={window.location.pathname === '/' ? s.Navbar__pageStatus_el_focused : s.Navbar__pageStatus_el}
            >
              Choose Appointment
            </div>
            <div
              className={
                window.location.pathname === '/userInfo' ? s.Navbar__pageStatus_el_focused : s.Navbar__pageStatus_el
              }
            >
              Your Info
            </div>
            <div
              className={
                window.location.pathname === '/confirmation' || window.location.pathname === '/confirmation-package'
                  ? s.Navbar__pageStatus_el_focused
                  : s.Navbar__pageStatus_el
              }
            >
              Confirmation
            </div>
          </div>
        )}

        <div className={s.Navbar__navigation}>
          {AuthStore.rights === 'admin' && (
            <>
              <Link to="/clients" style={{ textAlign: 'center', textDecoration: 'none' }}>
                <ButtonOutlined>Clients</ButtonOutlined>
              </Link>
              <Link to="/employees" style={{ textAlign: 'center', textDecoration: 'none' }}>
                <ButtonOutlined>Employees</ButtonOutlined>
              </Link>
            </>
          )}
          {(AuthStore.rights === 'admin' || AuthStore.rights === 'employee') && (
            <>
              <Link to="/calendar" style={{ textAlign: 'center', textDecoration: 'none' }}>
                <ButtonOutlined>Calendar</ButtonOutlined>
              </Link>
              <Link to="/coupons" style={{ textAlign: 'center', textDecoration: 'none' }}>
                <ButtonOutlined>Coupons</ButtonOutlined>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
export default NavBar;
