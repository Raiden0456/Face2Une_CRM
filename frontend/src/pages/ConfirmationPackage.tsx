import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import NavBar from '../components/Navbar';
import { AppointmentService } from '../service/AppointmentService';
import { TailSpinFixed } from '../components/TailSpin';
import ProcedureBox from '../components/ProcedureBox';
import useForm from '../utils/useForm';
import { Input, NumberInput } from '../components/base/Input';
import { AuthService } from '../service/AuthService';
import { AuthStore } from '../store/Auth.store';
import { ClientService } from '../service/ClientService';

import s from './ConfirmationPackage.scss';

export const ConfirmationPackage = () => {
  const authService = new AuthService();
  const appointmentService = new AppointmentService();
  const clientService = new ClientService();
  const [buyPackage, setBuyPackage] = useState<any>(null);
  console.log(buyPackage);

  const [loading, setLoading] = useState({ global: false, local: false });

  const { inputs, handleChange, handleNumberChange, clearForm, resetForm, setInputs } = useForm({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [phoneError, setPhoneError] = useState<boolean>(false);

  useEffect(() => {
    setLoading({ ...loading, global: true });
    authService.getUser().then((r) => {
      setLoading({ ...loading, global: false });
    });
  }, []);

  // Look up for booking info in sessionStorage
  // Redirect back if not found
  useEffect(() => {
    setLoading({ ...loading, global: true });
    let sessionBuyPackage: any = sessionStorage.getItem('buy_package');
    const parsedMainPassanger = JSON.parse(sessionBuyPackage);
    setBuyPackage(JSON.parse(sessionBuyPackage));

    if (sessionBuyPackage) {
      setInputs({
        firstName: AuthStore.firstName,
        lastName: AuthStore.lastName,
        phone: AuthStore?.phone,
        email: AuthStore.email,
      });
      setLoading({ ...loading, global: false });
    } else {
      window.location.href = window.location.origin;
    }
  }, [AuthStore.email]);

  const handleConfirmation = () => {
    /* check client */
    clientService.getClient(inputs.email).then((r) => {
      if (r.data) {
        const { id } = r.data[0];

        /* create package buy */
        appointmentService.createPack({ client_id: id, package_id: buyPackage.id, amount: 1 }).then((r) => {
          if (r.success) {
            console.log('Package for the Passenger Created!', r);
          }
        });
      } else {
        /* create client */
        clientService.createClient(inputs, '/confirmation-package').then((r) => {
          if (r.success && r.data) {
            const { id } = r.data[0];

            /* create package buy */
            appointmentService.createPack({ client_id: id, package_id: buyPackage.id, amount: 1 }).then((r) => {
              if (r.success) {
                console.log('Package for the Passenger Created!', r);
              }
            });
          }
        });
      }
    });
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
                <h2>Your order:</h2>
              </div>

              <div className={s.ConfirmationPackage__content}>
                <form
                  className={s.PackageInfoForm}
                  id="userInfo"
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    !phoneError && handleConfirmation();
                  }}
                >
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
                  </div>
                  <div>
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

                <ProcedureBox type="pack" procedure={buyPackage} />
              </div>

              <div className={s.Confirmation__footer}>
                {buyPackage && (
                  <p>
                    <strong>Total:</strong> {buyPackage?.price}€
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
