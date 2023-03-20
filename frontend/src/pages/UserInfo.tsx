import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import NavBar from '../components/Navbar';
import UserInfoForm from '../components/UserInfoForm';
import { TailSpinFixed } from '../components/TailSpin';
import useForm from '../utils/useForm';
import { useNavigate } from 'react-router-dom';
import { ClientService } from '../service/ClientService';
import { AuthStore } from '../store/Auth.store';
import { AuthService } from '../service/AuthService';
import { handleConfirmClient } from '../hooks/handleConfirmClient';

import s from './UserInfo.scss';

export const UserInfo = () => {
  const clientService = new ClientService();
  const authService = new AuthService();
  const navigate = useNavigate();
  const { inputs, handleChange, handleNumberChange, clearForm, resetForm, setInputs } = useForm({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const clientId = await handleConfirmClient({
      email: inputs.email,
      clientInfo: inputs,
      fallback: '/userInfo',
    });

    if (clientId) {
      sessionStorage.setItem('user_info', JSON.stringify({ ...inputs, clientId: clientId }));
      navigate('/confirmation');
    }
  };

  useEffect(() => {
    setLoading(true);
    authService.getUser().then((r) => {
      setLoading(false);
    });
  }, []);

  // Look up for booking info in sessionStorage
  // Redirect back if not found
  useEffect(() => {
    setLoading(true);
    let sessionMainPassanger = sessionStorage.getItem('main_passanger');

    if (sessionMainPassanger) {
      setInputs({
        firstName: AuthStore.firstName,
        lastName: AuthStore.lastName,
        phone: AuthStore?.phone,
        email: AuthStore.email,
      });
      setLoading(false);
    } else {
      window.location.href = window.location.origin;
    }
  }, [AuthStore.email]);

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          {loading ? (
            <TailSpinFixed />
          ) : (
            <>
              <div className={s.YourDetails}>
                <div className={s.YourDetails__header}>
                  <h3>Your Details</h3>
                </div>
                <div className={s.YourDetails__content}>
                  <p>
                    Enter your personal details below that will be used to make a reservation (details of a single
                    person is enough). Upon arriving at Face2Une use this data to proceed with your flight on beauty the
                    spaceship!
                  </p>
                </div>
              </div>

              <UserInfoForm
                inputs={inputs}
                handleChange={handleChange}
                handleNumberChange={handleNumberChange}
                handleSubmit={handleSubmit}
              />
            </>
          )}
        </>
      }
    />
  );
};
