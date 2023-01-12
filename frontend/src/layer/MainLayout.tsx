import React from 'react';
import { observer } from 'mobx-react';
import { Modals } from '../components/Modals';
import cn from 'classnames';

import s from './MainLayout.scss';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: any;
  mobile?: boolean;
  footer?: React.ReactNode;
  background?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = observer(({ children, footer, background, mobile }) => {
  return (
    <div className={cn(s.MainLayout, background ? s.MainLayout__background : '')}>
      <div className={s.MainLayout__content}>
        <>
          {children}
          <Modals mobile={mobile} />
        </>
      </div>
    </div>
  );
});

export default MainLayout;
