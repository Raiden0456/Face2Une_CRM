import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import s from './Home.scss';
import NavBar from '../components/Navbar';
import BookingBox from '../components/base/BookingBox';
import { ProceduresService } from '../service/ProceduresService';
import { TailSpinFixed } from '../components/TailSpin';
import { ProceduresStore } from '../store/Procedures.store';

export const Home = () => {
  const proceduresService = new ProceduresService();
  const [displayInput, setDisplayInput] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch Main & Optional Procedures
  useEffect(() => {
    setLoading(true);
    proceduresService.getOptionalProcedures().then((optionalProcedures) => {
      console.log(optionalProcedures);
      if (optionalProcedures?.success) {
        ProceduresStore.setProceduresStatus({
          ...ProceduresStore.proceduresStatus,
          optionalProceduresData: optionalProcedures.data,
        });
      }
    });

    proceduresService.getProcedures().then((procedures) => {
      console.log(procedures);
      if (procedures?.success) {
        ProceduresStore.setProceduresStatus({
          ...ProceduresStore.proceduresStatus,
          proceduresData: procedures.data,
        });
        setLoading(false);
      }
    });
  }, []);

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div style={{ margin: '25px 0', alignSelf: 'start', width: '25%' }}>
            <ButtonContained
              onClick={() => {
                setDisplayInput(!displayInput);
              }}
            >
              Use My Code
            </ButtonContained>
            {displayInput && (
              <Input
                value={input}
                onChange={(value) => {
                  setInput(value);
                }}
              />
            )}
          </div>
          {loading ? (
            <TailSpinFixed />
          ) : (
            ProceduresStore.proceduresStatus.proceduresData?.map((procedure, i) => {
              return <BookingBox key={procedure.id} procedure={procedure} />;
            })
          )}
        </>
      }
    />
  );
};
