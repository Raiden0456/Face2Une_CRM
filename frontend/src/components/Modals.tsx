import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';
import { ModalStore } from '../store/Modal.store';
import BookingBox from '../components/base/BookingBox';

export const ModalsCustomStyles: object = {
  content: {
    padding: '0',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-25%',
    transform: 'translate(-50%, -50%)',
    background: '#FFFFFF',
    boxShadow: '0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)',
    borderRadius: '12px',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.35)',
    backdropFilter: 'blur(12px)',
  },
};

export const ModalsCustomStylesMobile: object = {
  content: {
    padding: '0',
    top: '60%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFFFFF',
    boxShadow: '0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)',
    borderRadius: '12px',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.35)',
    backdropFilter: 'blur(12px)',
  },
};

export const Modals = observer(({ mobile }: { mobile: boolean | undefined }) => {
  useEffect(() => {
    if (ModalStore.modalStatus.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [ModalStore.modalStatus.action]);

  return (
    <Modal
      isOpen={ModalStore.modalStatus.open}
      onRequestClose={() => {
        // temp
        if (ModalStore.modalStatus.redirectUrl) {
          window.location.replace(ModalStore.modalStatus.redirectUrl);
        } else if (ModalStore.modalStatus.action !== 'loader') {
          ModalStore.setModalStatus({ open: false, action: null });
        }
      }}
      style={!mobile ? ModalsCustomStyles : ModalsCustomStylesMobile}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      {ModalStore.modalStatus.action === 'additional_procedures' && <BookingBox type='modal' />}
      {ModalStore.modalStatus.action === 'loader' && <p>Loading...</p>}
    </Modal>
  );
});
