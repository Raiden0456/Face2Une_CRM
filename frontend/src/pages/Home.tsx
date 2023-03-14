import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import ProcedureBox from '../components/ProcedureBox';
import { TailSpinFixed } from '../components/TailSpin';
import { ProceduresStore } from '../store/Procedures.store';
import PackageBox from '../components/PackageBox';
import useForm from '../utils/useForm';
import { AddPackage, AddProcedure } from '../components/AddProductForms';

import s from './Home.scss';

export const Home = ({ loading }: { loading: boolean }) => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({ email: '', promo: '' });
  const [displayInput, setDisplayInput] = useState(false);

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div style={{ margin: '25px 0', alignSelf: 'start', minWidth: '200px' }}>
            <ButtonContained
              onClick={() => {
                setDisplayInput(!displayInput);
              }}
            >
              Use My Code
            </ButtonContained>
            {displayInput && (
              <>
                <Input name="email" value={inputs.email} placeholder="Email:" onChange={handleChange} />
                <Input name="promo" value={inputs.promo} placeholder="Promocode:" onChange={handleChange} />
              </>
            )}
          </div>
          {loading ? (
            <TailSpinFixed />
          ) : (
            <>
              <div className={s.Home__divider}>
                <h2>Tunes</h2>
              </div>

              {ProceduresStore.proceduresStatus.proceduresData?.map((procedure, i) => {
                return <ProcedureBox key={procedure.id} procedure={procedure} />;
              })}

              {/* Add new procedure */}
              <AddProcedure />

              {/* <hr style={{ borderTop: '2px solid #e2e2e2', width: '100%', marginBottom: '2rem' }} /> */}

              <div className={s.Home__divider}>
                <h2>Packages</h2>
              </div>

              {ProceduresStore.proceduresStatus.packagesData?.map((packageItem, i) => {
                return <PackageBox key={i} packageItem={packageItem} />;
              })}

              {/* Add new package */}
              <AddPackage />
            </>
          )}
        </>
      }
    />
  );
};
