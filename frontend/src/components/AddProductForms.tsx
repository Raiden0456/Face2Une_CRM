import React, { useState } from 'react';
import { Input } from './base/Input';
import { Checkbox } from './base/Checkbox';
import useForm from '../utils/useForm';
import { ButtonContained, ButtonOutlined } from './base/Button';
import { ProceduresService } from '../service/ProceduresService';
import { AuthStore } from '../store/Auth.store';
import { saloon_ids } from '../utils/staticData';
import { ProceduresStore } from '../store/Procedures.store';
import { filterObjectToArray } from '../utils/funcs';

import s from './AddProductForms.scss';

export function AddProcedure() {
  const proceduresService = new ProceduresService();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [saloonIds, setSaloonIds] = useState<number[]>([]);
  const [additional, setAdditional] = useState<0 | 1>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    description: '',
    price: '',
    price_gbp: '',
    duration: '',
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const createProcedure = { ...inputs, additional, saloon_ids: saloonIds };

    proceduresService.createProcedure(createProcedure).then((r) => {
      console.log(r);
      setLoader(false);
      setShowForm(false);
    });

    window.location.reload();
  };

  return (
    <>
      {AuthStore.rights === 'admin' && (
        <div className={s.AddProductWrapper}>
          <ButtonOutlined width="200px" onClick={() => setShowForm(!showForm)}>
            Create Procedure
          </ButtonOutlined>
          {showForm && (
            <form id="addProcedure" onSubmit={handleSubmit} className={s.AddProductForm}>
              <h2>Create a New Procedure</h2>
              <div className={s.AddProductForm__inputs}>
                <div>
                  <Input
                    required
                    className={s.Input}
                    name="name"
                    label="Name:"
                    type="text"
                    value={inputs?.name}
                    onChange={handleChange}
                  />
                  <br />
                  <Input
                    required
                    className={s.Input}
                    name="description"
                    label="Description:"
                    type="text"
                    value={inputs?.description}
                    onChange={handleChange}
                  />
                  <br />
                  <Input
                    required
                    className={s.Input}
                    name="price"
                    label="Price (EUR):"
                    type="number"
                    min="0"
                    value={inputs?.price}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    required
                    className={s.Input}
                    name="price_gbp"
                    label="Price (GBP):"
                    type="number"
                    min="0"
                    value={inputs?.price_gbp}
                    onChange={handleChange}
                  />
                  <br />
                  <Input
                    required
                    className={s.Input}
                    name="duration"
                    label="Duration (mins):"
                    type="number"
                    min="0"
                    value={inputs?.duration}
                    onChange={handleChange}
                  />
                  <br />
                  <Checkbox
                    name="additional"
                    onChange={(e: boolean) => (e === true ? setAdditional(1) : setAdditional(0))}
                  >
                    Additional Procedure
                  </Checkbox>
                </div>
                <div className={s.AddProductForm__saloons}>
                  <h3>Available Saloons:</h3>
                  {saloon_ids.map((saloon) => (
                    <Checkbox
                      style={{ marginRight: '0.5rem' }}
                      onChange={(e: boolean) =>
                        e === true
                          ? setSaloonIds([...saloonIds, saloon.value])
                          : setSaloonIds([...saloonIds].filter((el) => el !== saloon.value))
                      }
                      key={saloon.id}
                    >
                      {saloon.text}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <ButtonContained disabled={loader} type="submit">
                Add Procedure
              </ButtonContained>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export function AddPackage() {
  const proceduresService = new ProceduresService();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [procedures, setProcedures] = useState({});
  const { inputs, handleChange, handleNumberChange, clearForm, resetForm } = useForm({
    name: '',
    price: '',
    amount: '',
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);

    proceduresService.createPackage({ ...inputs, procedure_ids: filterObjectToArray(procedures) }).then((r) => {
      setLoader(false);
      setShowForm(false);
    });

    window.location.reload();
  };

  const handleCheckBoxes = (e: any, id: number) => {
    setProcedures({ ...procedures, [id]: e });
  };

  return (
    <>
      {AuthStore.rights === 'admin' && (
        <div className={s.AddProductWrapper}>
          <ButtonOutlined width="200px" onClick={() => setShowForm(!showForm)}>
            Create Package
          </ButtonOutlined>
          {showForm && (
            <form id="addProcedure" onSubmit={handleSubmit} className={s.AddProductForm}>
              <h2>Create a New Package</h2>
              <div className={s.AddProductForm__inputs} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <Input
                  required
                  className={s.Input}
                  name="name"
                  label="Name:"
                  type="text"
                  value={inputs?.name}
                  onChange={handleChange}
                />
                <br />
                <Input
                  required
                  className={s.Input}
                  name="price"
                  label="Price:"
                  type="number"
                  min="0"
                  value={inputs?.price}
                  onChange={handleChange}
                />
                <br />
                <Input
                  required
                  className={s.Input}
                  name="amount"
                  label="Amount:"
                  type="number"
                  min="0"
                  value={inputs?.description}
                  onChange={handleChange}
                />
                <br />
                <div className={s.AddProductForm__procedures}>
                  <h4>Select Procedure(s):</h4>
                  <div>
                    {ProceduresStore.proceduresStatus.proceduresData?.map((proc, i) => (
                      <Checkbox onChange={(e) => handleCheckBoxes(e, proc.id)} key={proc.id}>
                        {proc.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>
              </div>

              <ButtonContained disabled={loader} type="submit">
                Add Package
              </ButtonContained>
            </form>
          )}
        </div>
      )}
    </>
  );
}
