import React, { useEffect, useState } from 'react';
import { ButtonContained } from '../base/Button';
import { TailSpinFixed } from '../TailSpin';
import { SelectField } from '../base/SelectField';
import { ProceduresStore, SaloonsData } from '../../store/Procedures.store';
import { findElementById } from '../../utils/funcs';

import s from './AddItem.scss';

// Select soolon and save its ID to local storage
const SelectSaloon: React.FC<any> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [saloon, setSaloon] = useState<any>({
    label: ProceduresStore.saloonsStatus.saloonsData!![0].address,
    value: ProceduresStore.saloonsStatus.saloonsData!![0].id,
  });

  /* useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []); */

  // Add Client Order
  const handleSubmit = async () => {
    localStorage.setItem('saloon', String(saloon.value));
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <TailSpinFixed />
      ) : (
        <div className={s.AddItem}>
          <form
            id="AddClientOrder"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={s.AddItemForm}
          >
            <h2>Studios</h2>
            <div className={s.AddItemForm__inputs}>
              <img
                style={{ borderRadius: '8px' }}
                aria-label="Studio photo"
                width="300px"
                height="300px"
                src={findElementById(ProceduresStore.saloonsStatus.saloonsData!!, saloon.value)?.image_src}
              />
              <SelectField
                required
                style={{ width: '100%' }}
                label={'Choose a Studio'}
                options={ProceduresStore.saloonsStatus.saloonsData?.map((saloon: SaloonsData) => ({
                  label: saloon.address,
                  value: saloon.id,
                }))}
                onChange={(e) => setSaloon(e)}
                value={saloon}
              />
            </div>

            <ButtonContained disabled={loading} type="submit">
              Continue
            </ButtonContained>
          </form>
        </div>
      )}
    </>
  );
};

export default SelectSaloon;
