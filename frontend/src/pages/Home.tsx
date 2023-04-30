import React, { useEffect, useState } from 'react';
import { Container } from '../components/base/Container';

import NavBar from '../components/Navbar';
import ProcedureBox from '../components/ProcedureBox';
import { TailSpinFixed } from '../components/TailSpin';
import { ProceduresStore, SaloonsData } from '../store/Procedures.store';
import PackageBox from '../components/PackageBox';
import CertificateBox from '../components/CertificateBox';
import { AddCertificate, AddPackage, AddProcedure } from '../components/AddProductForms';
import { SelectField } from '../components/base/SelectField';
import { findElementById } from '../utils/funcs';
import { UseCode } from '../components/UseCode';

import s from './Home.scss';

export const Home = ({ loading }: { loading: boolean }) => {
  const [saloon, setSaloon] = useState<any>(null);

  useEffect(() => {
    const localStorageSaloon = localStorage.getItem('saloon');
    if (localStorageSaloon && ProceduresStore.saloonsStatus.saloonsData) {
      setSaloon({
        label: findElementById(ProceduresStore.saloonsStatus.saloonsData, Number(localStorageSaloon)).address,
        value: findElementById(ProceduresStore.saloonsStatus.saloonsData, Number(localStorageSaloon)).id,
      });
    }
  }, [ProceduresStore.saloonsStatus.saloonsData]);

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div className={s.Home__header}>
            <UseCode />
            <div>
              <SelectField
                style={{ width: '200px' }}
                label={'Select a Studio'}
                options={ProceduresStore.saloonsStatus.saloonsData?.map((saloon: SaloonsData) => ({
                  label: saloon.address,
                  value: saloon.id,
                }))}
                onChange={(e) => {
                  localStorage.setItem('saloon', String(e.value));
                  window.location.reload();
                }}
                value={saloon}
              />
            </div>
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

              <div className={s.Home__divider}>
                <h2>Packages</h2>
              </div>

              {ProceduresStore.proceduresStatus.packagesData?.map((packageItem, i) => {
                return <PackageBox key={i} packageItem={packageItem} />;
              })}

              {/* Add new package */}
              <AddPackage />

              <div className={s.Home__divider}>
                <h2>Certificates</h2>
              </div>

              {ProceduresStore.proceduresStatus.certificatesData?.map((certItem, i) => {
                return <CertificateBox key={i} certItem={certItem} />;
              })}

              {/* Add new certificate */}
              <AddCertificate />
            </>
          )}
        </>
      }
    />
  );
};
