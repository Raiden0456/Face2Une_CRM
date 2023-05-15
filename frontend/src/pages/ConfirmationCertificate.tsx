import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import NavBar from '../components/Navbar';
import { AppointmentService } from '../service/AppointmentService';
import { TailSpinFixed } from '../components/TailSpin';
import ProductBox from '../components/ProductBox';
import useForm from '../utils/useForm';
import { Input, PhoneInputStyled } from '../components/base/Input';
import { AuthStore } from '../store/Auth.store';
import { handleConfirmClient } from '../hooks/handleConfirmClient';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { getCurrencySymbol } from '../utils/getCurrencySymbol';
import { loadStripe } from '@stripe/stripe-js';

import s from './ConfirmationCertificate.scss';

export const ConfirmationCertificate = () => {
  const appointmentService = new AppointmentService();
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState({ global: false, local: false });

  const { inputs, handleChange, handleNumberChange, clearForm, resetForm, setInputs } = useForm({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [phoneError, setPhoneError] = useState<boolean>(false);

  // Look up for booking info in sessionStorage
  // Redirect back if not found
  useEffect(() => {
    setLoading({ ...loading, global: true });
    let sessionBuyCertificate: any = sessionStorage.getItem('buy_certificate');
    setCertificate(JSON.parse(sessionBuyCertificate));

    if (sessionBuyCertificate) {
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

  const handleConfirmation = async () => {
    setLoading({ ...loading, global: true });
    const clientId = await handleConfirmClient({
      email: inputs.email,
      clientInfo: inputs,
      fallback: '/confirmation-certificate',
    });

    // Stripe test key
    const stripe = await loadStripe(process.env.STRIPE_TEST_PUBLIC_KEY as string);

    if (clientId) {
      appointmentService
        .buyCertificate({
          client_id: clientId,
          certificate_id: certificate.id,
          saloon_id: Number(localStorage.getItem('saloon')),
        })
        .then((r) => {
          if (r.id) {
            stripe?.redirectToCheckout({ sessionId: r.id }).then(function (result) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, you should display the localized error message to your
              // customer using `error.message`.
              if (result.error) {
                setLoading({ ...loading, global: false });
                alert(result.error.message);
              }
            });
          }
        });
    }
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
                    isPossiblePhoneNumber(`+${inputs?.phone}`) && handleConfirmation();
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
                    <PhoneInputStyled
                      defaultValue={`+${inputs?.phone}`}
                      onChange={(e) => handleNumberChange(e, 'phone')}
                      error={phoneError}
                      label="Phone:"
                      onBlur={() =>
                        isPossiblePhoneNumber(`+${inputs?.phone}`) ? setPhoneError(false) : setPhoneError(true)
                      }
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

                <ProductBox type="pack" procedure={certificate} />
              </div>

              <div className={s.Confirmation__footer}>
                <p>
                  <strong>Total:</strong> {certificate?.price}
                  {getCurrencySymbol(localStorage.getItem('currency'))}
                </p>

                <ButtonContained type="submit" form="userInfo" width="200px">
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
