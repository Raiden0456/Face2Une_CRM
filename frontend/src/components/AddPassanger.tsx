import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { SelectField } from './base/SelectField';
import { ButtonContained } from './base/Button';
import { observer } from 'mobx-react';
import { ProceduresStore } from '../store/Procedures.store';

import './AddPassanger.scss';

const ITEM_LIMIT = 4;

export const AddPassanger = observer(({ setProcedures, setItems, items, procedures }: any) => {
  // Add Passenger
  const handleAdd = () => {
    if (items.length >= ITEM_LIMIT) {
      alert(`Item limit of ${ITEM_LIMIT} reached!`);
    } else {
      setItems([...items, { label: procedures[0]?.name, value: procedures[0]?.id }]);
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
      <div className="AddPassenger__procedures_wrapper">
        {procedures &&
          items.map((el: any, i: number) => (
            <SelectField
              key={i}
              label="Choose a Procedure"
              options={procedures.map((procedure: any) => ({ label: procedure.name, value: procedure.id }))}
              onChange={(e) => handleUpdate(e, i)}
              defaultValue={{ label: procedures[0].name, value: procedures[0].id }}
            />
          ))}
      </div>

      <div className="AddPassenger__buttons" style={{ marginTop: '14px' }}>
        <ButtonContained onClick={handleAdd}>Add Passanger</ButtonContained>
        <ButtonContained style={{ backgroundColor: 'rgba(119, 119, 119, 0.511)'}} onClick={handleClear}>
          Clear Passangers
        </ButtonContained>
      </div>
    </>
  );
});

export default AddPassanger;
