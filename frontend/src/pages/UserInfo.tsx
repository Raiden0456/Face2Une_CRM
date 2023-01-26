import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import s from './Home.scss';
import NavBar from '../components/Navbar';
import BookingBox from '../components/BookingBox';
import { ProceduresService } from '../service/ProceduresService';
import { TailSpinFixed } from '../components/TailSpin';
import { ProceduresStore } from '../store/Procedures.store';
import PersonalAgreement from '../components/PersonalAgreement';
import UserInfoForm from '../components/UserInfoForm';
import ProcedureBox from '../components/ProcedureBox';


export const UserInfo = () => {
  const proceduresService = new ProceduresService();
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(false);

  // TBD
  // Look up for booking info in sessionStorage
  // Redirect back if not found
  useEffect(() => {
    let sessionProcId = sessionStorage.getItem('proc_id');
    setLoading(true);
    // Pass id from sessionStorage (TBD)
    if (sessionProcId) {
      proceduresService.getProcedure(sessionProcId).then((procedure) => {
        console.log(procedure);
        setLoading(false);
        if (procedure?.success) {
          setProcedure(procedure.data[0]);
        }
      });
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
          {loading ? <TailSpinFixed /> : <ProcedureBox procedure={procedure} />}

          <UserInfoForm />
        </>
      }
    />
  );
};
