import React from 'react';
import { ButtonContained } from '../components/base/Button';
import { Container } from '../components/base/Container';
import NavBar from '../components/Navbar';

import s from './StatusPage.scss';

export const StatusPage = ({ type }: { type: 'success' | 'error' }) => {
  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <div className={s.StatusPage}>
          <div className={s.StatusContainer__header}>
            {type === 'success' && <h1 className={s.StatusContainer_header_title}>Thank you for choosing Face2Une!</h1>}
            {type === 'error' && <h1 className={s.StatusContainer_header_title}>Something went wrong...</h1>}
          </div>

          <div className={s.StatusContainer__content}>
            {type === 'success' && (
              <div className={s.StatusContainer_content_description}>
                Your payment was successfully recieved. Appointment details are sent to your email.
              </div>
            )}
            {type === 'error' && (
              <div className={s.StatusContainer_content_description}>
                Your payment was not recieved. Please try again later.
              </div>
            )}
          </div>

          <div className={s.StatusContainer__footer}>
            <ButtonContained
              className={s.StatusContainer__footer_button}
              onClick={() => {
                window.location.replace(window.location.origin);
              }}
            >
              Return to main page
            </ButtonContained>
          </div>
        </div>
      }
    />
  );
};
