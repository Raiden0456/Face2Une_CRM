import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import NavBar from '../components/Navbar';
import { ProceduresService } from '../service/ProceduresService';
import UserInfoForm from '../components/UserInfoForm';
import { TailSpinFixed } from '../components/TailSpin';
import useForm from '../utils/useForm';
import { useNavigate } from 'react-router-dom';

import s from './UserInfo.scss';

export const UserInfo = () => {
  const navigate = useNavigate();
  const { inputs, handleChange, handleNumberChange, clearForm, resetForm } = useForm({
    name: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log('UserInfoForm', inputs);
    sessionStorage.setItem('user_info', JSON.stringify(inputs));

    navigate('/confirmation');
  };

  // Look up for booking info in sessionStorage
  // Redirect back if not found
  useEffect(() => {
    setLoading(true);
    let sessionMainPassanger: any = sessionStorage.getItem('main_passanger');

    if (sessionMainPassanger) {
      setLoading(false);
    } else {
      window.location.href = window.location.origin;
    }
  }, []);

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
