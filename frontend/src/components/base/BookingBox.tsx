import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { ButtonContained } from '../base/Button';
import { Checkbox } from '../base/Checkbox';
import { ModalStore } from '../../store/Modal.store';
import { ProceduresStore } from '../../store/Procedures.store';
import { ProcedureData } from '../../store/Procedures.store';

import s from './BookingBox.scss';

interface IBookingBox {
  width?: string;
  type?: 'main' | 'modal';
  procedure?: ProcedureData | null;
}

const BookingBox: React.FC<IBookingBox> = ({ width = '100%', type = 'main', procedure }) => {
  const [optionalProcedures, setOptionalProcedures] = useState({});

  const handleCheckBoxes = (e: any, id: number) => {
    setOptionalProcedures({ ...optionalProcedures, [id]: e });
  };

  const handleClick = () => {
    if (type === 'main') {
      ModalStore.setModalStatus({
        action: 'complete_booking',
        open: true,
        procedure: procedure,
      });
    } else {
      console.log('Procedure ID:', procedure?.id);
      console.log('Additional Procedures:', optionalProcedures);

      ModalStore.setModalStatus({
        action: null,
        open: false,
        procedure: null,
      });
    }
  };
  return (
    <div
      id={procedure?.id.toString()}
      className={type === 'main' ? s.BookingBox : s.BookingBoxModal}
      style={{ width: width }}
    >
      <div className={s.BookingBox__header}>
        <div className={s.BookingBox__header_column}>
          {ModalStore.modalStatus.open && <h2>Your Cart:</h2>}
          <h3>{procedure?.name}</h3>
          <p>
            {procedure?.duration} minutes @ {procedure?.price}€
          </p>
        </div>
        <div className={s.BookingBox__header_btns}>
          <ButtonContained width="20%" onClick={handleClick}>
            Book
          </ButtonContained>
          {type === 'main' && (
            <ButtonContained
              width="5%"
              style={{ backgroundColor: 'rgba(119, 119, 119, 0.511)' }}
              onClick={() => {
                alert('Edit procedure by Admin');
              }}
            >
              Edit
            </ButtonContained>
          )}
        </div>
      </div>
      <div className={s.BookingBox__content}>
        <p>{procedure?.description}</p>
      </div>

      {type === 'modal' && ProceduresStore.proceduresStatus.optionalProceduresData && (
        <div className={s.BookingBox__optionalProcedures}>
          {ProceduresStore.proceduresStatus.optionalProceduresData?.map((optProd, i) => (
            <Checkbox onChange={(e) => handleCheckBoxes(e, optProd.id)} key={optProd.id}>
              {optProd.name}
            </Checkbox>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingBox;
