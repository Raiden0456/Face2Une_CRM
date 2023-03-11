import { ButtonContained } from '../components/base/Button';
import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ModalStore } from '../store/Modal.store';
import NavBar from '../components/Navbar';
import { Scheduler } from '@aldabil/react-scheduler';
import { AppointmentService } from '../service/AppointmentService';
import { renameAndDeleteArrayObjects } from '../utils/funcs';
import { Button } from '@mui/material';

import './Calendar.scss';

const CalendarAlert = () => (
  <Button
    style={{
      height: '100%',
      background: 'transparent',
      cursor: 'pointer',
    }}
    onClick={() => {
      return alert('Use "Add Appointment Manually" button');
    }}
  ></Button>
);

export const Calendar = () => {
  const appointmentService = new AppointmentService();
  const [loading, setLoading] = useState<boolean>(false);

  function handleRemoteEvents() {
    setLoading(true);
    return new Promise<void>((res) => {
      appointmentService.getAppointments().then((r: any) => {
        console.log(r.data);
        setLoading(false);

        const result = renameAndDeleteArrayObjects(r.data, {
          id: 'event_id',
          reservation_date_time: 'start',
          date_end: 'end',
          procedure_name: 'title',
        });

        console.log(result);

        res(result);
      });
    });
  }

  // Fetch and Store Main & Optional Procedures [IF EMPTY]
  // TBD + Fix Bug with routing
  /* useEffect(() => {
    setLoading(true);
    if()
    proceduresService.getOptionalProcedures().then((optionalProcedures) => {
      if (optionalProcedures?.success) {
        ProceduresStore.setProceduresStatus({
          ...ProceduresStore.proceduresStatus,
          optionalProceduresData: optionalProcedures.data,
        });
      }

      proceduresService.getProcedures().then((procedures) => {
        if (procedures?.success) {
          ProceduresStore.setProceduresStatus({
            ...ProceduresStore.proceduresStatus,
            proceduresData: procedures.data,
          });
        }
      });
    });
  }, []); */

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
            view="week"
            hourFormat="24"
            editable={false}
            deletable={false}
            draggable={false}
            loading={loading}
            getRemoteEvents={handleRemoteEvents}
            day={null}
            month={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 10,
              endHour: 20,
              navigation: true,
              disableGoToDay: false,
              cellRenderer: ({ height, start, onClick, ...props }) => <CalendarAlert />,
            }}
            week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 10,
              endHour: 20,
              step: 60,
              cellRenderer: ({ height, start, onClick, ...props }) => <CalendarAlert />,
            }}
          />
        </>
      }
    />
  );
};
