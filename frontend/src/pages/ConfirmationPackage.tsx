import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { NumberDropdown } from '../components/base/SelectField';
import NavBar from '../components/Navbar';
import { AppointmentService } from '../service/AppointmentService';
import { TailSpinFixed } from '../components/TailSpin';
import ProductBox from '../components/ProductBox';
import useForm from '../utils/useForm';
import { Input, PhoneInputStyled } from '../components/base/Input';
import { AuthStore } from '../store/Auth.store';
import { handleConfirmClient } from '../hooks/handleConfirmClient';

import s from './ConfirmationPackage.scss';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

// Custom hook to use async script
const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export const ConfirmationPackage = () => {
  const appointmentService = new AppointmentService();
  const [buyPackage, setBuyPackage] = useState<any>(null);
  const [selectQuantity, setSelectQuantity] = useState<number>(1);
  const [showPaymentWidget, setShowPaymentWidget] = useState<boolean>(false);

  useScript('https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js');

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
    let sessionBuyPackage: any = sessionStorage.getItem('buy_package');
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

  const handleConfirmation = async () => {
    const clientId = await handleConfirmClient({
      email: inputs.email,
      clientInfo: inputs,
      fallback: '/confirmation-package',
    });

    if (clientId) {
      appointmentService
        .buyPack({ client_id: clientId, package_id: buyPackage.id, amount: Number(selectQuantity) })
        .then((r) => {
          if (r.success) {
            console.log('Package for the Passenger Created!', r);
            setShowPaymentWidget(true);
            // @ts-ignore
            if (window.SumUpCard) {
              // @ts-ignore
              window.SumUpCard.mount({
                id: 'sumup-card',
                checkoutId: '2ceffb63-cbbe-4227-87cf-0409dd191a98',
                onResponse: function (type: any, body: any) {
                  console.log('Type', type);
                  console.log('Body', body);
                },
              });
            }
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
              {showPaymentWidget ? (
                <div id="sumup-card"></div>
              ) : (
                <>
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

                    <ProductBox type="pack" procedure={buyPackage} />
                  </div>

                  <div className={s.Confirmation__footer}>
                    <div className={s.Confirmation__footer_selectWrapper}>
                      <p>
                        <strong>Number of packages:</strong>
                      </p>
                      <NumberDropdown
                        min={1}
                        max={10}
                        value={selectQuantity}
                        onChange={(value: number) => setSelectQuantity(value)}
                      />
                    </div>
                    {buyPackage && (
                      <p>
                        <strong>Total:</strong> {buyPackage?.price * selectQuantity}€
                      </p>
                    )}

                    <ButtonContained type="submit" form="userInfo" width="200px">
                      Pay Now
                    </ButtonContained>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      }
    />
  );
};
