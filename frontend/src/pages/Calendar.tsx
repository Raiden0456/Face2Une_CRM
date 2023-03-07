import { ButtonContained } from '../components/base/Button';
import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ModalStore } from '../store/Modal.store';

import NavBar from '../components/Navbar';

import s from './Calendar.scss';

export const Calendar = () => {
  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <ButtonContained
            width="200px"
            onClick={() => {
              ModalStore.setModalStatus({
                action: "addAppointment",
                open: true,
              });
            }}
          >
            Add Appointment
          </ButtonContained>
        </>
      }
    />
  );
};
