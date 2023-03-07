import React, { useState } from 'react';
import useForm from '../utils/useForm';
import { Checkbox, Radio } from './base/Checkbox';
import { Input, NumberInput } from './base/Input';
import { ButtonContained } from './base/Button';
import { saloon_ids } from '../utils/staticData';
import { ProceduresStore } from '../store/Procedures.store';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import DatePicker from 'react-datepicker';
import { ClientService } from '../service/ClientService';
import { AppointmentService } from '../service/AppointmentService';
import { filterObjectToArray } from '../utils/funcs';

import s from './AddAppointment.scss';
import { SelectField } from './base/SelectField';

type AppointmentStatus = 'checkClient' | 'clientExists' | 'noClient';

export const AddAppointment = () => {
  const clientService = new ClientService();
  const appointmentService = new AppointmentService();

  const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>('checkClient');
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [loader, setLoader] = useState<boolean>(false);
  const [saloonID, setSaloonID] = useState<number | null>(null);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [saloonIds, setSaloonIds] = useState<number[]>([]);
  const [clientID, setClientID] = useState<number | null>(null);
  const [pickedProcedure, setPickedProcedure] = useState(() =>
    ProceduresStore.proceduresStatus.proceduresData ? ProceduresStore.proceduresStatus.proceduresData[0].id : null,
  );
  const [procedures, setProcedures] = useState<any>(() => ProceduresStore.proceduresStatus.proceduresData || null);
  const [pickedOptProcedures, setPickedOptProcedures] = useState<number[]>([]);
  const [optProcedures, setOptProcedures] = useState<any>(
    () => ProceduresStore.proceduresStatus.optionalProceduresData || null,
  );

  const { inputs, handleChange, handleNumberChange, clearForm, resetForm } = useForm({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    price_gbp: '',
    duration: '',
  });

  // Pick additional_proc
  const handleCheckBoxes = (e: any, id: number) => {
    setPickedOptProcedures(filterObjectToArray({ ...pickedOptProcedures, [id]: e }));
  };

  // Update Procedure
  /* function handleUpdate(updatedItem: any, index: number) {
    let newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
  } */

  //Check if client exists
  const handleCheckClient = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);

    clientService.getClient(inputs.email).then((r) => {
      setLoader(false);
      clearForm();
      if (r.data) {
        const { id } = r.data[0];
        setClientID(id);
        setAppointmentStatus('clientExists');
      } else {
        setAppointmentStatus('noClient');
      }
    });
  };

  //Create a new client with
  const handleCreateClient = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);

    clientService
      .createClient({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        phone: inputs.phone,
        email: inputs.email,
      })
      .then((r) => {
        setLoader(false);
        clearForm();
        if (r.success && r.data) {
          const { id } = r.data[0];
          setClientID(id);
          setAppointmentStatus('clientExists');
        }
      });
  };

  //Create a new appointment
  const handleCreateAppoint = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);

    appointmentService
      .createAppointment({
        proc_id: pickedProcedure as number,
        opt_proc_id: pickedOptProcedures,
        date: startDate,
        client_id: clientID as number,
        saloon_id: saloonID as number,
      })
      .then((r) => {
        setLoader(false);
        clearForm();
        if (r.success) {
          setAppointmentStatus('clientExists');
        }
      });
  };

  return (
    <div className={s.AddAppointmentModal}>
      {appointmentStatus === 'checkClient' && (
        <form id="checkClient" onSubmit={handleCheckClient} className={s.AddAppointmentForm}>
          <div>
            <h2>Find a client</h2>
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

          <ButtonContained disabled={loader} type="submit">
            Submit
          </ButtonContained>
        </form>
      )}
      {appointmentStatus === 'noClient' && (
        <form id="checkClient" onSubmit={handleCreateClient} className={s.AddAppointmentForm}>
          <div>
            <h2>Create a new client</h2>
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
            <NumberInput
              error={phoneError}
              helperText={phoneError && 'Your phone number is not valid!'}
              numberFormat="+# (###) ###-##-##"
              type="tel"
              className={s.Input}
              onBlur={() => (inputs?.phone.length === 11 ? setPhoneError(false) : setPhoneError(true))}
              label="Phone:"
              name="phone"
              defaultValue={inputs?.phone}
              value={inputs?.phone}
              onChange={(e) => handleNumberChange(e, 'phone')}
            />
            <br />
            <Input
              autoComplete="email"
              required
              label="Email:"
              type="email"
              name="email"
              value={inputs?.email}
              onChange={handleChange}
            />
          </div>

          <ButtonContained disabled={loader} type="submit">
            Submit
          </ButtonContained>
        </form>
      )}
      {appointmentStatus === 'clientExists' && (
        <form id="checkClient" onSubmit={handleCreateAppoint} className={s.AddAppointmentForm}>
          <div>
            <h2>Create an appointment</h2>

            <div className={s.AddAppointmentForm_procs}>
              <SelectField
                label={'Choose a Procedure'}
                options={procedures.map((procedure: any) => ({ label: procedure.name, value: procedure.id }))}
                onChange={(e) => setPickedProcedure(e.value)}
                defaultValue={{ label: procedures[0].name, value: procedures[0].id }}
              />

              <div className={s.BookingBox__optionalProcedures}>
                {ProceduresStore.proceduresStatus.optionalProceduresData?.map((optProd, i) => (
                  <Checkbox onChange={(e) => handleCheckBoxes(e, optProd.id)} key={optProd.id}>
                    {optProd.name}
                  </Checkbox>
                ))}
              </div>
            </div>

            <div className={s.AddAppointmentForm__saloons}>
              <h3>Available Saloons:</h3>
              {saloon_ids.map((saloon) => (
                <Radio
                  name="saloons"
                  value={saloon.id}
                  style={{ marginRight: '0.5rem' }}
                  onChange={(e) => setSaloonID(Number(e))}
                  key={saloon.id}
                >
                  {saloon.text}
                </Radio>
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
            Create Appointment
          </ButtonContained>
        </form>
      )}
      {appointmentStatus === 'clientExists' && <div className={s.Success}>Success!</div>}
      {/* <form id="addAppointment" onSubmit={handleSubmit} className={s.AddAppointmentForm}>
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
      </form> */}
    </div>
  );
};
