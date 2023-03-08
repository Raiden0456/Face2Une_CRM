import { ButtonContained } from '../components/base/Button';
import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ModalStore } from '../store/Modal.store';
import NavBar from '../components/Navbar';
import { Scheduler } from '@aldabil/react-scheduler';

import './Calendar.scss';

export const Calendar = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div className="AddAppointmentBtn_wrapper">
            <ButtonContained
              width="200px"
              onClick={() => {
                ModalStore.setModalStatus({
                  action: 'addAppointment',
                  open: true,
                });
              }}
            >
              Add Appointment Manually
            </ButtonContained>
          </div>

          <Scheduler
            view="month"
            hourFormat="24"
            loading={loading}
            onConfirm={(e, action) => {
              console.log(e, action);
              return Promise.resolve(e);
            }}
            onDelete={(id) => {
              console.log(id);
              return Promise.resolve(id);
            }}
            events={[
              {
                event_id: 1,
                title: 'Event 1',
                start: new Date('2023/3/10 09:30'),
                end: new Date('2023/3/10 10:30'),
              },
              {
                event_id: 2,
                title: 'Event 2',
                start: new Date('2023/3/8 09:30'),
                end: new Date('2023/3/8 10:30'),
              },
            ]}
          />
        </>
      }
    />
  );
};
