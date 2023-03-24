import React, { useEffect, useState } from 'react';
import { ButtonContained } from '../base/Button';
import { CouponsService } from '../../service/CouponsService';
import useForm from '../../utils/useForm';
import { IAddItem } from '../../store/Modal.store';
import { TailSpinFixed } from '../TailSpin';
import { Input, NumberInput } from '../base/Input';
import { ProceduresStore } from '../../store/Procedures.store';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { filterObjectToArray } from '../../utils/funcs';
import { Checkbox, Radio } from '../base/Checkbox';
import ReactDatePicker from 'react-datepicker';
import { IconEyeClosed, IconEyeOpened } from '../../assets/svg';
import { saloon_ids } from '../../utils/staticData';
import { UserService } from '../../service/UserService';
import { AppointmentService } from '../../service/AppointmentService';
import { SelectField } from '../base/SelectField';

import s from './AddItem.scss';

function useFormInit(type: 'coupon' | 'employee' | 'appointment' | '') {
  switch (type) {
    case 'coupon':
      return {
        name: '',
        code: '',
        discount: '',
      };
    case 'employee':
      return { first_name: '', last_name: '', phone: '', email: '', password: '' };
    case 'appointment':
      return {
        id: '',
        client_id: '',
      };
  }
}

// Adds new COUPON or EMPLOYEE or APPOINTMENT(edit only)
const AddItem: React.FC<IAddItem> = ({ addType, id, edit }) => {
  const couponService = new CouponsService();
  const userService = new UserService();
  const appointmentService = new AppointmentService();
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [procedure, setProcedure] = useState<number | null>(null);
  const [procedures, setProcedures] = useState({});
  const [saloonID, setSaloonID] = useState<number | null>(null);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState(false);
  const { inputs, handleChange, handleNumberChange, clearForm, resetForm, setInputs } = useForm(useFormInit(addType));

  useEffect(() => {
    if (edit && id && addType === 'coupon') {
      setLoading(true);
      couponService.getCoupon(id).then((r) => {
        if (r.success) {
          const { name, code, discount } = r.data[0];
          setInputs({
            name,
            code,
            discount,
          });
          setLoading(false);
        }
      });
    }
    if (edit && id && addType === 'employee') {
      setLoading(true);
      userService.getEmployee(id).then((r) => {
        if (r.success) {
          const { first_name, last_name, phone, email } = r.data[0];
          setInputs({
            first_name,
            last_name,
            phone,
            email,
            password: '',
          });
          setLoading(false);
        }
      });
    }
    if (edit && id && addType === 'appointment') {
      setLoading(true);
      appointmentService.getAppointment(id).then((r) => {
        if (r.success) {
          const { id, client_id } = r.data[0];
          setInputs({
            id,
            client_id,
          });
          setLoading(false);
        }
      });
    }
  }, []);

  // Add Item Handler
  const handleSubmit = async () => {
    setLoading(true);

    if (addType === 'coupon') {
      if (!edit) {
        couponService
          .createCoupon({ ...inputs, procedure_ids: filterObjectToArray(procedures), expiry_date: startDate })
          .then((r) => {
            if (r.success) {
              console.log('Successfully Added!');
              window.location.reload();
            }
          });
      } else {
        couponService
          .updateCoupon({ ...inputs, procedure_ids: filterObjectToArray(procedures), expiry_date: startDate, id })
          .then((r) => {
            if (r.success) {
              console.log('Successfully Updated!');
              window.location.reload();
            }
          });
      }
    } else if (addType === 'employee') {
      if (!edit) {
        userService.createEmployee({ ...inputs, saloon_id: saloonID, rights: 'employee' }).then((r) => {
          if (r.success) {
            console.log('Successfully Added!');
            window.location.reload();
          }
        });
      } else {
        userService.updateEmployee({ ...inputs, saloon_id: saloonID, rights: 'employee', id }).then((r) => {
          if (r.success) {
            console.log('Successfully Updated!');
            window.location.reload();
          }
        });
      }
    } else if (addType === 'appointment' && edit) {
      appointmentService
        .updateAppointment({
          ...inputs,
          additional_ids: filterObjectToArray(procedures),
          procedure_id: procedure,
          saloon_id: saloonID,
          reservation_date_time: startDate,
        })
        .then((r) => {
          if (r.success) {
            console.log('Successfully Updated!');
            window.location.reload();
          }
        });
    }

    setLoading(false);
  };

  const handleCheckBoxes = (e: any, id: number) => {
    setProcedures({ ...procedures, [id]: e });
  };

  const handlePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      {loading ? (
        <TailSpinFixed />
      ) : (
        <div className={s.AddItem}>
          {/* ADD/EDIT APPOINTMENT */}
          {addType === 'coupon' && (
            <form
              id="AddItem"
              onSubmit={(e) => {
                e.preventDefault();
                if (filterObjectToArray(procedures).length) {
                  handleSubmit();
                }
              }}
              className={s.AddItemForm}
            >
              {edit ? <h2>Edit Coupon</h2> : <h2>Create a New Coupon</h2>}
              <div className={s.AddItemForm__inputs}>
                <div>
                  <Input
                    required
                    className={s.Input}
                    name="name"
                    label="Name:"
                    type="text"
                    value={inputs?.name}
                    onChange={handleChange}
                  />
                  <br />
                  <Input
                    required
                    className={s.Input}
                    name="code"
                    label="Code:"
                    type="text"
                    value={inputs?.code}
                    onChange={handleChange}
                  />
                  <br />
                  <Input
                    required
                    className={s.Input}
                    name="discount"
                    label="Discount:"
                    type="number"
                    min="0"
                    value={inputs?.discount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <div className={s.AddItemForm__procs}>
                    <h3>Available Procedures:</h3>
                    {ProceduresStore.proceduresStatus.proceduresData?.map((proc, i) => (
                      <Checkbox
                        style={{ marginRight: '0.5rem' }}
                        onChange={(e) => handleCheckBoxes(e, proc.id)}
                        key={i}
                      >
                        {proc.name}
                      </Checkbox>
                    ))}
                  </div>
                  <br />
                  <div className={s.AddItem__datepicker}>
                    <p style={{ marginBottom: '5px' }}>Choose Expirity Date:</p>
                    <ReactDatePicker
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
              </div>

              <ButtonContained disabled={loading} type="submit">
                Add Coupon
              </ButtonContained>
            </form>
          )}

          {/* ADD/EDIT APPOINTMENT */}
          {addType === 'employee' && (
            <form
              id="AddItem"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={s.AddItemForm}
            >
              {edit ? <h2>Edit Employee</h2> : <h2>Add a New Employee</h2>}
              <div className={s.AddItemForm__inputs}>
                <div>
                  <Input
                    required
                    className={s.Input}
                    name="first_name"
                    label="First Name:"
                    type="text"
                    value={inputs?.first_name}
                    onChange={handleChange}
                  />
                  <br />
                  <Input
                    required
                    className={s.Input}
                    name="last_name"
                    label="Last name:"
                    type="text"
                    value={inputs?.last_name}
                    onChange={handleChange}
                  />
                  <br />
                  <NumberInput
                    required
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
                </div>
                <div>
                  <Input
                    required
                    className={s.Input}
                    name="email"
                    label="Email:"
                    type="email"
                    value={inputs?.email}
                    onChange={handleChange}
                  />
                  <br />
                  <Input
                    required
                    className={s.Input}
                    name="password"
                    label="Password:"
                    endIcon={!hidePassword ? <IconEyeClosed /> : <IconEyeOpened />}
                    onIconClick={handlePassword}
                    type={hidePassword ? 'text' : 'password'}
                    value={inputs?.password}
                    onChange={handleChange}
                  />
                  <br />
                  <div className={s.AddAppointmentForm__saloons}>
                    <h3>Available Saloons:</h3>
                    {saloon_ids.map((saloon) => (
                      <Radio
                        name="saloons"
                        value={saloon.id}
                        style={{ marginRight: '0.5rem' }}
                        onChange={(e) => setSaloonID(Number(e))}
                        key={saloon.id}
                        required
                      >
                        {saloon.text}
                      </Radio>
                    ))}
                  </div>
                </div>
              </div>

              <ButtonContained disabled={loading} type="submit">
                Add Employee
              </ButtonContained>
            </form>
          )}

          {/* EDIT APPOINTMENT */}
          {addType === 'appointment' && (
            <form
              id="createAppointment"
              onSubmit={(e) => {
                e.preventDefault();
                procedure && handleSubmit();
              }}
              className={s.AddItemForm}
            >
              <h2>Edit an appointment:</h2>
              <div className={s.AddItemForm__inputs}>
                <div>
                  <SelectField
                    label={'Choose a Procedure'}
                    options={ProceduresStore?.proceduresStatus?.proceduresData?.map((procedure: any) => ({
                      label: procedure.name,
                      value: procedure.id,
                    }))}
                    required
                    onChange={(e) => setProcedure(e.value)}
                  />

                  <div className={s.AddItemForm_radios}>
                    {ProceduresStore.proceduresStatus.optionalProceduresData?.map((optProd, i) => (
                      <Checkbox onChange={(e) => handleCheckBoxes(e, optProd.id)} key={optProd.id}>
                        {optProd.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>

                <div>
                  <div className={s.AddItemForm_radios}>
                    <h3>Available Saloons:</h3>
                    {saloon_ids.map((saloon) => (
                      <Radio
                        name="saloons"
                        value={saloon.id}
                        style={{ marginRight: '0.5rem' }}
                        onChange={(e) => setSaloonID(Number(e))}
                        key={saloon.id}
                        required
                      >
                        {saloon.text}
                      </Radio>
                    ))}
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ marginBottom: '5px' }}>Choose Date:</p>
                    <ReactDatePicker
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
              </div>

              <ButtonContained disabled={loading} type="submit">
                Edit Appointment
              </ButtonContained>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default AddItem;
