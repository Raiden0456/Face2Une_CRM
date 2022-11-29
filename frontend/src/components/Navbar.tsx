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
        <div className={s.Navbar__left}>
          <div className={s.Navbar__logo} onClick={() => (window.location.href = window.location.origin)}>
            <h2>Starter Template</h2>
          </div>
        </div>

        <div className={s.Navbar__right}>
          {AuthStore.authorized === 'auth' && <div onClick={() => authService.signOut()}>Logout</div>}
        </div>
      </div>
    </div>
  );
});
export default NavBar;
