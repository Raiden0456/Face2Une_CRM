import React, { useState } from 'react';
import useForm from '../utils/useForm';
import { Checkbox } from './base/Checkbox';
import { Input } from './base/Input';
import { ButtonContained } from './base/Button';
import { saloon_ids } from '../utils/staticData';
import { ProceduresStore } from '../store/Procedures.store';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import DatePicker from 'react-datepicker';

import s from './AddAppointment.scss';

export const AddAppointment = () => {
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [loader, setLoader] = useState<boolean>(false);
  const [newClient, setNewClient] = useState<boolean>(false);
  const [saloonIds, setSaloonIds] = useState<number[]>([]);
  const [procedures, setProcedures] = useState<any>(() => ProceduresStore.proceduresStatus.proceduresData || null);
  const [optProcedures, setOptProcedures] = useState<any>(
    () => ProceduresStore.proceduresStatus.optionalProceduresData || null,
  );
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    price_gbp: '',
    duration: '',
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <div className={s.AddAppointmentModal}>
      <form id="addAppointment" onSubmit={handleSubmit} className={s.AddAppointmentForm}>
        <h2>Create a New Appointment</h2>
        <div>
          <div className={s.AddAppointmentForm__inputs}>
            <div>
              <Input
                required
                className={s.Input}
                name="firstName"
                label="First Name:"
                type="text"
                value={inputs?.firstName}
                onChange={handleChange}
              />
              <br />
              <Input
                required
                className={s.Input}
                name="lastName"
                label="Last Name:"
                type="text"
                value={inputs?.lastName}
                onChange={handleChange}
              />
              <br />
              <Input
                autoComplete="email"
                required
                label="Client's Email:"
                type="email"
                name="email"
                value={inputs?.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Checkbox name="newClient" onChange={(e: boolean) => setNewClient(e)}>
                New Client
              </Checkbox>
            </div>
          </div>
          <div className={s.AddAppointmentForm__saloons}>
            <h3>Available Saloons:</h3>
            {saloon_ids.map((saloon) => (
              <Checkbox
                style={{ marginRight: '0.5rem' }}
                onChange={(e: boolean) =>
                  e === true
                    ? setSaloonIds([...saloonIds, saloon.value])
                    : setSaloonIds([...saloonIds].filter((el) => el !== saloon.value))
                }
                key={saloon.id}
              >
                {saloon.text}
              </Checkbox>
            ))}
          </div>
          <div className={s.AddAppointmentForm__datepicker}>
            <p style={{ marginBottom: '5px' }}>Choose Date:</p>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              minDate={new Date()}
              minTime={setHours(setMinutes(new Date(), 0), 10)}
              maxTime={setHours(setMinutes(new Date(), 0), 20)}
              timeIntervals={5}
              dateFormat="MMMM d, yyyy HH:mm"
              inline
            />
          </div>
        </div>

        <ButtonContained disabled={loader} type="submit">
          Add Appointment
        </ButtonContained>
      </form>
    </div>
  );
};
