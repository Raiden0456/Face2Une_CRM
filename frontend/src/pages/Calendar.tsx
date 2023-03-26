import { ButtonContained, ButtonEdit, ButtonOutlined } from '../components/base/Button';
import React, { useEffect, useState } from 'react';
import { Container } from '../components/base/Container';
import { ModalStore } from '../store/Modal.store';
import NavBar from '../components/Navbar';
import { Scheduler, useScheduler } from '@aldabil/react-scheduler';
import { AppointmentService } from '../service/AppointmentService';
import { renameAndDeleteArrayObjects } from '../utils/funcs';
import { Button, Typography } from '@mui/material';
import { LocationOnRounded, PersonRounded, PaymentsRounded, FaceRetouchingNaturalRounded } from '@mui/icons-material';
import { formatPhoneNumber } from '../utils/formatPhone';
import { saloon_ids } from '../utils/staticData';
import { Radio } from '../components/base/Checkbox';
import { SelectField } from '../components/base/SelectField';
import { UserService } from '../service/UserService';
import { TailSpinFixed } from '../components/TailSpin';

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

interface ISource {
  id: number;
  source: string;
}

const calendarNamings = {
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
};

export const Calendar = () => {
  const appointmentService = new AppointmentService();
  const userService = new UserService();
  const [loading, setLoading] = useState<boolean>(false);
  const [saloonID, setSaloonID] = useState<number>(1);
  const [clientQuestion, setClientQuestion] = useState<boolean>(false);
  const [sources, setSources] = useState<ISource[] | null>(null);
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  const { setEvents, triggerLoading } = useScheduler();

  useEffect(() => {
    setLoading(true);
    userService.getSources().then((r) => {
      if (r.success) {
        setSources(r.data);
      }
      setLoading(false);
    });
  }, []);

  function handleRemoteEvents() {
    return new Promise<void>((res) => {
      appointmentService.getAppointments().then((r: any) => {
        if (r.success) {
          const result = renameAndDeleteArrayObjects(r.data, calendarNamings);

          res(result);
        }
      });
    });
  }

  function handleQuestionSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    userService.addSource(selectedSource as number).then((r) => {
      if (r.success) {
        console.log(r.data);
        alert('Answer submitted successfully!');
      }
      setLoading(false);
      setClientQuestion(false);
    });
  }

  // Edit Employee
  const editHandler = async (id: number | null) => {
    ModalStore.setAddItem({ addType: 'appointment', edit: true, id });
    ModalStore.setModalStatus({ open: true, action: 'addItem', redirectUrl: '/calendar' });
    setEvents([]);
  };

  // Change Saloon
  const sallonHandler = async (sallonId: number | null) => {
    triggerLoading(true);
    appointmentService.getAppointments(sallonId).then((r: any) => {
      if (r.success) {
        const result = renameAndDeleteArrayObjects(r.data, calendarNamings);
        setEvents(result);
        triggerLoading(false);
      }
    });
  };

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div className="Calendar__header">
            <div>
              <h3>Calendar</h3>
              <div className="Btns_wrapper">
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
                {loading ? (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <TailSpinFixed />
                  </div>
                ) : (
                  <ButtonOutlined
                    width="200px"
                    onClick={() => {
                      setClientQuestion(!clientQuestion);
                      setSelectedSource(null);
                    }}
                  >
                    Client question
                  </ButtonOutlined>
                )}
              </div>
              {clientQuestion && (
                <div className="clientQuestion_wrapper">
                  <form onSubmit={handleQuestionSubmit}>
                    <SelectField
                      required
                      label={'Choose a response'}
                      options={sources?.map((source: any) => ({ label: source.source, value: source.id }))}
                      onChange={(e) => setSelectedSource(e.value)}
                    />
                    <ButtonEdit width="200px" type="submit">
                      Submit
                    </ButtonEdit>
                  </form>
                </div>
              )}
            </div>

            <div className="Salloon__switcher">
              <h3>Available Saloons:</h3>
              <Radio
                required
                name="saloons"
                onChange={(e) => {
                  sallonHandler(Number(e));
                }}
                value={0}
              >
                All
              </Radio>
              {saloon_ids.map((saloon) => (
                <Radio
                  required
                  name="saloons"
                  onChange={(e) => {
                    sallonHandler(Number(e));
                  }}
                  key={saloon.id}
                  value={saloon.id}
                >
                  {saloon.text}
                </Radio>
              ))}
            </div>
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
