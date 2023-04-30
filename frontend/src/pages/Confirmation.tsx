import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import NavBar from '../components/Navbar';
import { ProceduresService } from '../service/ProceduresService';
import { AppointmentService } from '../service/AppointmentService';
import { TailSpinFixed } from '../components/TailSpin';
import ProductBox from '../components/ProductBox';
import { allProcsIds } from '../utils/funcs';
import { ProceduresStore } from '../store/Procedures.store';
import { getCurrencySymbol } from '../utils/getCurrencySymbol';
import { UseCode } from '../components/UseCode';

import s from './Confirmation.scss';

export const Confirmation = () => {
  const proceduresService = new ProceduresService();
  const appointmentService = new AppointmentService();
  const [mainPassanger, setMainPassanger] = useState<any>(null);
  const [addPassangers, setAddPassangers] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState({ global: false, local: false });
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [total, setTotal] = useState<any>(null);
  const [promocode, setPromocode] = useState<any>(null);

  // Look up for booking info in sessionStorage
  // Redirect back if not found
  useEffect(() => {
    setLoading({ ...loading, global: true });
    let sessionMainPassanger: any = sessionStorage.getItem('main_passanger');
    const parsedMainPassanger = JSON.parse(sessionMainPassanger);
    setMainPassanger(JSON.parse(sessionMainPassanger));

    let sessionAddPassangers: any = sessionStorage.getItem('add_passangers');
    const parsedAddPassangers = JSON.parse(sessionAddPassangers);
    setAddPassangers(JSON.parse(sessionAddPassangers));

    let sessionUserInfo: any = sessionStorage.getItem('user_info');
    setUserInfo(JSON.parse(sessionUserInfo));

    /* SESSION STORAGE LOGS */
    console.log('From session mainPassanger', parsedMainPassanger);
    console.log('From session addPassangers', parsedAddPassangers);
    console.log('From session userInfo', JSON.parse(sessionUserInfo));

    if (sessionMainPassanger && sessionUserInfo) {
      // Fetch MAIN proc for main passanger
      proceduresService.getProcedure(parsedMainPassanger.proc_id).then((procedure) => {
        if (procedure?.success) {
          setProcedure(procedure.data[0]);

          // Calc total sum
          proceduresService.calcTotal(allProcsIds(parsedMainPassanger, parsedAddPassangers)).then((total) => {
            if (total?.success) {
              setTotal(total.data);
              setLoading({ ...loading, global: false });
            }
          });
        }
      });
    } else {
      window.location.href = window.location.origin;
    }
  }, []);

  const handleConfirmation = () => {
    const { proc_id, opt_proc_id, date } = mainPassanger;
    const { clientId } = userInfo;
    appointmentService
      /* Promocode commented until back is ready */
      .createAppointment({ proc_id, opt_proc_id, date, client_id: clientId /* promocode */ })
      .then((r) => {
        if (r.success) {
          console.log('Apponitment for Main Passenger Created!', r);
          // Здесь нужно сделть редирект на страницу с подтверждением через window.location.href="redirect_url"
        }
      });

    for (let passenger of addPassangers) {
      const { proc_id, opt_proc_id } = passenger;
      appointmentService.createAppointment({ proc_id, opt_proc_id, date, client_id: clientId }).then((r) => {
        if (r.success) {
          console.log('Apponitment for Additional Passenger Created!', r);
          // ИЛИ Здесь нужно сделть редирект на страницу с подтверждением через window.location.href="redirect_url"
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
            <div className={s.Confirmation}>
              <div className={s.Confirmation__header}>
                <h2>Your reservation, {userInfo?.firstName}:</h2>
              </div>

              {addPassangers?.length === 0 && <UseCode onPromocodeChange={setPromocode} />}

              <div className={s.Confirmation__content}>
                <div style={{ margin: '0' }}>
                  <h4>Main Passanger:</h4>
                  <ProductBox
                    procedure={procedure}
                    addProcedures={ProceduresStore.proceduresStatus.optionalProceduresData?.filter((el: any) =>
                      mainPassanger?.opt_proc_id?.includes(el.id),
                    )}
                  />
                </div>

                {addPassangers?.length > 0 && (
                  <div style={{ margin: '0' }}>
                    {isToggled ? (
                      loading.local ? (
                        <TailSpinFixed />
                      ) : (
                        <>
                          <h4 style={{ marginBottom: '0.5rem' }}>Additional Passangers:</h4>
                          {addPassangers.map((addPassenger: any, i: number) => (
                            <div key={i}>
                              <p style={{ color: '#777' }}>Passenger {i + 1}</p>
                              <ProductBox
                                procedure={
                                  ProceduresStore.proceduresStatus.proceduresData?.filter(
                                    (procedure: any) => addPassenger?.proc_id === procedure.id,
                                  )[0]
                                }
                                addProcedures={ProceduresStore.proceduresStatus.optionalProceduresData?.filter(
                                  (el: any) => addPassenger?.opt_proc_id?.includes(el.id),
                                )}
                              />
                            </div>
                          ))}
                        </>
                      )
                    ) : (
                      <ButtonContained width="200px" onClick={() => setIsToggled(!isToggled)}>
                        Load all passengers
                      </ButtonContained>
                    )}
                  </div>
                )}
              </div>

              <div className={s.Confirmation__footer}>
                <p>
                  <strong>Date:</strong> {new Date(mainPassanger?.date).toLocaleDateString()} at{' '}
                  {new Date(mainPassanger?.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
                {total && (
                  <p>
                    <strong>Total:</strong> {total.total}
                    {getCurrencySymbol(total.currency)}
                  </p>
                )}

                <ButtonContained onClick={handleConfirmation} width="35%">
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
