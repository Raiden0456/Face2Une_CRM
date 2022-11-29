import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';

export const ModalsCustomStyles: object = {
  content: {
    padding: '0',
    top: '50%',
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
  const [status, setStatus] = useState(false);

  return (
    <Modal
      isOpen={status}
      onRequestClose={() => {
        setStatus(false);
      }}
      style={!mobile ? ModalsCustomStyles : ModalsCustomStylesMobile}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <div>Your Components</div>
    </Modal>
  );
});
