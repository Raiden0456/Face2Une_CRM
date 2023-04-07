import React, { useState } from 'react';
import { ButtonContained } from '../base/Button';
import { TailSpinFixed } from '../TailSpin';
import { SelectField } from '../base/SelectField';
import { ClientService } from '../../service/ClientService';
import { CertificatesData, PackageData, ProceduresStore } from '../../store/Procedures.store';

import s from './AddItem.scss';

// Add working Days / Add lunch time
const AddClientOrder: React.FC<any> = ({ clientId, email }) => {
  const clientService = new ClientService();
  const [loading, setLoading] = useState<boolean>(false);
  const [pickedPackage, setPickedPackage] = useState<number | null>(null);
  const [pickedCert, setPickedCert] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Add Client Order
  const handleSubmit = async () => {
    setLoading(true);

    clientService
      .addClientOrder({ client_id: clientId, email, package_id: pickedPackage, certificate_id: pickedCert })
      .then((r) => {
        if (r.success) {
          console.log('Successfully Added!');
          setSuccess(true);
        }
      });

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <TailSpinFixed />
      ) : (
        <div className={s.AddItem}>
          {success ? (
            <div style={{ minWidth: '300px' }}>
              <h3 style={{ color: 'green', marginBottom: '1.5rem', textAlign: 'center' }}>Successfully Added!</h3>
              <ButtonContained onClick={() => window.location.reload()}>Ok</ButtonContained>
            </div>
          ) : (
            <form
              id="AddClientOrder"
              onSubmit={(e) => {
                e.preventDefault();
                if (!pickedPackage && !pickedCert) return alert('Please, select at least one package or certificate.');
                handleSubmit();
              }}
              className={s.AddItemForm}
            >
              <h2>Add Client Order</h2>
              <div className={s.AddItemForm__inputs}>
                <div>
                  <SelectField
                    style={{ width: '100%' }}
                    label={'Choose a Package'}
                    options={ProceduresStore.proceduresStatus.packagesData?.map((pack: PackageData) => ({
                      label: pack.name,
                      value: pack.id,
                    }))}
                    onChange={(e) => setPickedPackage(e.value)}
                  />
                </div>
                <div>
                  <SelectField
                    style={{ width: '100%' }}
                    label={'Choose a Certificate'}
                    options={ProceduresStore.proceduresStatus.certificatesData?.map((cert: CertificatesData) => ({
                      label: cert.name,
                      value: cert.id,
                    }))}
                    onChange={(e) => setPickedCert(e.value)}
                  />
                </div>
              </div>

              <ButtonContained disabled={loading} type="submit">
                Add Order
              </ButtonContained>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default AddClientOrder;
