import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import NavBar from '../components/Navbar';
import { ProceduresService } from '../service/ProceduresService';
import { AppointmentService } from '../service/AppointmentService';
import { TailSpinFixed } from '../components/TailSpin';
import ProcedureBox from '../components/ProcedureBox';
import { allProcsIds } from '../utils/funcs';

import s from './ConfirmationPackage.scss';
import useForm from '../utils/useForm';
import { Input, NumberInput } from '../components/base/Input';

const mock = { id: 1, name: 'test package', duration: 24, price: 777 };

export const ConfirmationPackage = () => {
  const proceduresService = new ProceduresService();
  const appointmentService = new AppointmentService();
  const [mainPassanger, setMainPassanger] = useState<any>(null); // TBD TS
  const [procedure, setProcedure] = useState(null); // TBD TS
  const [mainProcedures, setMainProcedures] = useState<any[]>([]); // TBD TS
  const [addProcedures, setAddProcedures] = useState<any[]>([]); // TBD TS
  const [loading, setLoading] = useState({ global: false, local: false });
  const [total, setTotal] = useState<number | null>(null);

  const { inputs, handleChange, handleNumberChange, clearForm, resetForm, setInputs } = useForm({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [phoneError, setPhoneError] = useState<boolean>(false);

  // Look up for booking info in sessionStorage
  // Redirect back if not found
  /* useEffect(() => {
    setLoading({ ...loading, global: true });
    let sessionMainPassanger: any = sessionStorage.getItem('main_passanger');
    const parsedMainPassanger = JSON.parse(sessionMainPassanger);
    setMainPassanger(JSON.parse(sessionMainPassanger));

    if (sessionMainPassanger) {
      Fetch MAIN proc for main passanger
      proceduresService.getProcedure(parsedMainPassanger.proc_id).then((procedure) => {
        if (procedure?.success) {
          setProcedure(procedure.data[0]);
        }
      });
      Calc total sum
      proceduresService.calcTotal(allProcsIds(parsedMainPassanger, parsedAddPassangers)).then((total) => {
        if (total?.success) {
          setTotal(total.data);
          setLoading({ ...loading, global: false });
        }
      });
    } else {
      window.location.href = window.location.origin;
    }
  }, []); */

  const handleConfirmation = () => {
    console.log('TBD CONFIRMATION');
  };

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          {loading.global ? (
            <TailSpinFixed />
          ) : (
            <div className={s.ConfirmationPackage}>
              <div className={s.ConfirmationPackage__header}>
                <h2>Your reservation, {/* {userInfo?.firstName} */}test:</h2>
              </div>

              <div className={s.ConfirmationPackage__content}>
                <form
                  className={s.UserInfoForm}
                  id="userInfo"
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    !phoneError && handleConfirmation();
                  }}
                >
                  <div className={s.UserInfoForm__inputs}>
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
                </form>

                <ProcedureBox procedure={mock} />
              </div>

              <div className={s.Confirmation__footer}>
                <p>
                  <strong>Date:</strong> {new Date(mainPassanger?.date).toLocaleDateString()} at{' '}
                  {new Date(mainPassanger?.date).toLocaleTimeString().slice(0, 5)}
                </p>
                {total && (
                  <p>
                    <strong>Total:</strong> {total}€
                  </p>
                )}

                <ButtonContained type="submit" form="userInfo" width="35%">
                  Pay Now
                </ButtonContained>
              </div>
            </div>
          )}
        </>
      }
    />
  );
};
