import { ButtonContained } from '../components/base/Button';
import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ModalStore } from '../store/Modal.store';
import NavBar from '../components/Navbar';
import { Scheduler } from '@aldabil/react-scheduler';
import { AppointmentService } from '../service/AppointmentService';
import { renameArrayObjects } from '../utils/funcs';

import './Calendar.scss';

export const Calendar = () => {
  const appointmentService = new AppointmentService();
  const [loading, setLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    appointmentService.getAppointments().then((r: any) => {
      setAppointments(renameArrayObjects(r.data, { id: 'event_id', reserved_on: 'start' }));
      setLoading(false);
    });
  }, []);

  console.log(appointments);

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
            events={appointments}
          />
        </>
      }
    />
  );
};
