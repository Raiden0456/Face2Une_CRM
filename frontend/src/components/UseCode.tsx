import React, { useState } from 'react';
import { CouponsService } from '../service/CouponsService';
import useForm from '../utils/useForm';
import { ButtonContained } from './base/Button';
import { Input } from './base/Input';
import { TailSpinFixed } from './TailSpin';
import { findElementById } from '../utils/funcs';
import { ProceduresStore } from '../store/Procedures.store';

import s from './UseCode.scss';

export const UseCode = ({ onPromocodeChange }: any) => {
  const couponsService = new CouponsService();
  const [promocode, setPromocode] = useState<any>(null);
  const { inputs, handleChange, clearForm, resetForm } = useForm({ email: '', code: '' });
  const [loader, setLoader] = useState(false);
  const [displayInput, setDisplayInput] = useState(false);

  // Use promocode
  const onPromo = () => {
    if (inputs.email && inputs.code) {
      setLoader(true);
      couponsService.checkPromocode(inputs.email, inputs.code).then((r) => {
        if (r.success) {
          setPromocode(r.data);
          setDisplayInput(!displayInput);
          resetForm();

          if (onPromocodeChange) {
            onPromocodeChange({ email: inputs.email, promocode: inputs.code, code_type: r.data.code_type });
          }
        }
        setLoader(false);
      });
    } else {
      setDisplayInput(!displayInput);
    }
  };

  return (
    <div>
      {loader ? (
        <TailSpinFixed />
      ) : (
        <>
          <ButtonContained width="200px" style={{ marginBottom: '1rem' }} onClick={onPromo}>
            Use Code
          </ButtonContained>
          {displayInput && (
            <div className={s.Use_code_inputs}>
              <Input name="email" value={inputs.email} placeholder="Email:" onChange={handleChange} />
              <Input name="code" value={inputs.promo} placeholder="Promocode:" onChange={handleChange} />
            </div>
          )}

          {promocode && (
            <div className={s.Use_code}>
              {promocode.message ? (
                <h3 style={{ marginBottom: 0 }}>{promocode.message}</h3>
              ) : (
                <>
                  <h3>{promocode.name}</h3>

                  <div>
                    <u>Promocode type:</u> {promocode.code_type}
                  </div>

                  {promocode.code_type === 'coupon' && (
                    <>
                      <div>
                        <u>Discount:</u> {promocode.discount}%
                      </div>

                      <div>
                        <u>Procedures: </u>
                        {promocode.procedure_ids
                          .map(
                            (id: number) => findElementById(ProceduresStore.proceduresStatus.proceduresData, id)?.name,
                          )
                          .join(', ')}
                      </div>
                    </>
                  )}

                  {promocode.code_type === 'certificate' && (
                    <>
                      <div>
                        <u>Discount:</u> {promocode.discount_left} {promocode.currency}
                      </div>
                    </>
                  )}

                  {promocode.code_type === 'package' && (
                    <>
                      <div>
                        <u>Procedure:</u> {promocode.name} ({promocode.amount_left_in} left)
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
