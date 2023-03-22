import { ButtonContained, ButtonEdit } from '../components/base/Button';
import React, { useState } from 'react';
import { Container } from '../components/base/Container';
import { ModalStore } from '../store/Modal.store';
import NavBar from '../components/Navbar';
import { Scheduler } from '@aldabil/react-scheduler';
import { AppointmentService } from '../service/AppointmentService';
import { renameAndDeleteArrayObjects } from '../utils/funcs';
import { Button, Typography } from '@mui/material';
import { LocationOnRounded, PersonRounded, PaymentsRounded, FaceRetouchingNaturalRounded } from '@mui/icons-material';
import { formatPhoneNumber } from '../utils/formatPhone';

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
        setLoading(false);

        const result = renameAndDeleteArrayObjects(r.data, {
          id: 'event_id',
          reservation_date_time: 'start',
          reservation_date_time_end: 'end',
          procedure_name: 'title',
          additional_names: 'titles_additionals',
          client_full_name: 'client_name',
          client_phone: 'client_phone',
          client_email: 'client_email',
          total_price: 'price',
          saloon_address: 'location',
        });

        res(result);
      });
    });
  }

  // Edit Employee
  const editHandler = async (id: number | null) => {
    ModalStore.setAddItem({ addType: 'appointment', edit: true, id });
    ModalStore.setModalStatus({ open: true, action: 'addItem' });
  };

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div className="Calendar__header">
            <h3>Calendar</h3>
          </div>
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
            viewerExtraComponent={(fields, event) => {
              return (
                <div>
                  <Typography
                    style={{ display: 'flex', alignItems: 'center' }}
                    color="textSecondary"
                    variant="caption"
                    noWrap
                  >
                    <LocationOnRounded />
                    &nbsp; {event.location || 'Unknown'}
                  </Typography>
                  <Typography
                    style={{ display: 'flex', alignItems: 'center' }}
                    color="textSecondary"
                    variant="caption"
                    noWrap
                  >
                    <PersonRounded />
                    &nbsp;{' '}
                    {event.client_name +
                      ' (' +
                      [formatPhoneNumber(event.client_phone), event.client_email].join(', ') +
                      ')'}
                  </Typography>
                  <Typography
                    style={{ display: 'flex', alignItems: 'center' }}
                    color="textSecondary"
                    variant="caption"
                    noWrap
                  >
                    <FaceRetouchingNaturalRounded />
                    &nbsp; {event.title + ' + (' + (event.titles_additionals.join(', ') || 'None') + ')'}
                  </Typography>
                  <Typography
                    style={{ display: 'flex', alignItems: 'center' }}
                    color="textSecondary"
                    variant="caption"
                    noWrap
                  >
                    <PaymentsRounded />
                    &nbsp; {event.price + '€' || 'None'}
                  </Typography>
                  <Typography
                    style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}
                    color="textSecondary"
                    variant="caption"
                    noWrap
                  >
                    <ButtonEdit
                      onClick={() => {
                        editHandler(event.event_id as number);
                      }}
                    >
                      Edit
                    </ButtonEdit>
                  </Typography>
                </div>
              );
            }}
          />
        </>
      }
    />
  );
};
