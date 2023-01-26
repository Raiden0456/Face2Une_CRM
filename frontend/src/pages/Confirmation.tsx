import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import BookingBox from '../components/BookingBox';
import { ProceduresService } from '../service/ProceduresService';
import { TailSpinFixed } from '../components/TailSpin';
import { ProceduresStore } from '../store/Procedures.store';
import PersonalAgreement from '../components/PersonalAgreement';
import UserInfoForm from '../components/UserInfoForm';
import ProcedureBox from '../components/ProcedureBox';

import s from './Confirmation.scss';

export const Confirmation = () => {
  const proceduresService = new ProceduresService();
  const [mainPassanger, setMainPassanger] = useState<any>(null); // TBD TS
  const [addPassangers, setAddPassangers] = useState<any>(null); // TBD TS
  const [userInfo, setUserInfo] = useState<any>(null); // TBD TS
  const [procedure, setProcedure] = useState(null); // TBD TS
  const [loading, setLoading] = useState<boolean>(false);

  // UPD.: USE IN CONFIRMATION COMP.
  // Look up for booking info in sessionStorage
  // Redirect back if not found
  useEffect(() => {
    setLoading(true);
    let sessionMainPassanger: any = sessionStorage.getItem('main_passanger');
    const parsedMainPassanger = JSON.parse(sessionMainPassanger);
    setMainPassanger(JSON.parse(sessionMainPassanger));

    let sessionAddPassangers: any = sessionStorage.getItem('add_passangers');
    setAddPassangers(JSON.parse(sessionAddPassangers));

    let sessionUserInfo: any = sessionStorage.getItem('user_info');
    setUserInfo(JSON.parse(sessionUserInfo));

    if (sessionMainPassanger && sessionUserInfo) {
      proceduresService.getProcedure(parsedMainPassanger.proc_id).then((procedure) => {
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

  /* console.log('From session mainPassanger', mainPassanger);
  console.log('From session addPassangers', addPassangers);
  console.log('From session userInfo', userInfo); */

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          {/* <ProcedureBox procedure={procedure} /> */}
          {loading ? (
            <TailSpinFixed />
          ) : (
            <div className={s.Confirmation}>
              <div>
                <p>From session mainPassanger:</p>
                <div>{JSON.stringify(mainPassanger)}</div>
              </div>
              <div>
                <p>From session addPassangers:</p>
                <div>{JSON.stringify(addPassangers)}</div>
              </div>
              <div>
                <p>From session userInfo:</p>
                <div>{JSON.stringify(userInfo)}</div>
              </div>
            </div>
          )}
        </>
      }
    />
  );
};
