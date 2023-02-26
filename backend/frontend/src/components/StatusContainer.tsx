import React, { useState } from 'react';
import { ButtonContained } from './base/Button';

import s from './StatusContainer.scss';
import { ModalStore } from '../store/Modal.store';

export const StatusContainer = () => {
  const { action } = ModalStore.modalStatus;
  return (
    <div className={s.StatusContainer}>
      <div className={s.StatusContainer__header}>
        <p
          onClick={() => {
            if (ModalStore.modalStatus.redirectUrl) {
              window.location.replace(ModalStore.modalStatus.redirectUrl);
            } else {
              ModalStore.setModalStatus({ open: false, action: null });
            }
          }}
          className={s.StatusContainer_header_link}
        >
          Back
        </p>
        {action === 'success' && <h1 className={s.StatusContainer_header_title}>Success</h1>}
        {action === 'error' && <h1 className={s.StatusContainer_header_title}>Error</h1>}
      </div>

      <div className={s.StatusContainer__content}>
        {ModalStore.modalStatus.action === 'error' && (
          <div className={s.StatusContainer_content_description}>
            <p style={{ color: '#B71C1C' }}>Something went wrong... Please, try again.</p>
          </div>
        )}
        {ModalStore.modalStatus.action === 'success' && (
          <div className={s.StatusContainer_content_description}>
            <p style={{ color: '#1C1C1E' }}>Success!</p>
          </div>
        )}
      </div>

      <div className={s.StatusContainer__footer}>
        <ButtonContained
          className={s.StatusContainer__footer_button}
          onClick={() => {
            if (ModalStore.modalStatus.redirectUrl) {
              window.location.replace(ModalStore.modalStatus.redirectUrl);
            } else {
              ModalStore.setModalStatus({ open: false, action: null });
            }
          }}
        >
          {action === 'error' && 'Retry'}
          {action === 'success' && 'Ok'}
        </ButtonContained>
      </div>
    </div>
  );
};
