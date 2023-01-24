import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { SelectField } from './base/SelectField';
import { ButtonContained } from './base/Button';
import { observer } from 'mobx-react';
import { ProceduresStore } from '../store/Procedures.store';
import { Checkbox } from './base/Checkbox';

import './AddPassanger.scss';

const ITEM_LIMIT = 4;

export const AddPassanger = observer(({ setProcedures, setItems, items, procedures, optionalProcedures }: any) => {
  // Add Passenger
  const handleAdd = () => {
    if (items.length >= ITEM_LIMIT) {
      alert(`Item limit of ${ITEM_LIMIT} reached!`);
    } else {
      setItems([...items, { label: procedures[0]?.name, value: procedures[0]?.id, opt_proc_id: {} }]);
    }
  };

  // Update Procedure
  function handleUpdate(updatedItem: any, index: number) {
    let newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
  }

  // Clear Passengers
  const handleClear = () => {
    setItems([]);
  };

  //console.log('Additional Passengers', items);
  return (
    <>
      {procedures &&
        items.length > 0 &&
        items.map((el: any, i: number) => (
          <div className="AddPassenger__procedures_wrapper">
            <div key={i} style={{ marginBottom: '1rem' }}>
              <SelectField
                label={`Choose a Procedure for Passenger ${i + 2}`}
                options={procedures.map((procedure: any) => ({ label: procedure.name, value: procedure.id }))}
                onChange={(e) => handleUpdate({ ...items[i], ...e }, i)}
                defaultValue={{ label: procedures[0].name, value: procedures[0].id }}
              />
              {ProceduresStore.proceduresStatus.optionalProceduresData?.map((optProd) => (
                <Checkbox
                  onChange={(e: any) =>
                    handleUpdate({ ...items[i], opt_proc_id: { ...items[i].opt_proc_id, [optProd.id]: e } }, i)
                  }
                  key={optProd.id}
                >
                  {optProd.name}
                </Checkbox>
              ))}
            </div>
          </div>
        ))}

      <div className="AddPassenger__buttons">
        <ButtonContained onClick={handleAdd}>Add Passanger</ButtonContained>
        <ButtonContained style={{ backgroundColor: 'rgba(119, 119, 119, 0.511)' }} onClick={handleClear}>
          Clear Passangers
        </ButtonContained>
      </div>
    </>
  );
});

export default AddPassanger;
