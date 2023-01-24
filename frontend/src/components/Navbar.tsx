import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import s from './NavBar.scss';
import { AuthStore } from '../store/Auth.store';
import { AuthService } from '../service/AuthService';

const NavBar = observer(() => {
  const authService = new AuthService();

  return (
    <div className={s.HeaderWrapper}>
      <div className={s.Navbar}>
        <div className={s.Navbar__logo}>
          Face2Une
        </div>

        <div className={s.Navbar__pageStatus}>
          <div className={s.Navbar__pageStatus_el_focused}>
            Choose Appointment
          </div>
          <div className={s.Navbar__pageStatus_el}>
            Your Info
          </div>
          <div className={s.Navbar__pageStatus_el}>
            Confirmation
          </div>
        </div>
      </div>
    </div>
  );
});
export default NavBar;
