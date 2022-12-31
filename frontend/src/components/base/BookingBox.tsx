import React from 'react';
import classNames from 'classnames/bind';
import { ButtonContained } from '../base/Button';
import { ModalStore } from '../../store/Modal.store';

import s from './BookingBox.scss';

interface IBookingBox {
  width?: string;
  type?: 'main' | 'modal';
  procedure?: object;
}

const BookingBox: React.FC<IBookingBox> = ({ width = '100%', type = 'main', procedure}) => {  
  return (
    <div className={type === 'main' ? s.BookingBox : s.BookingBoxModal} style={{ width: width }}>
      <div className={s.BookingBox__header}>
        <div className={s.BookingBox__header_column}>
          {ModalStore.modalStatus.open && <h2>Your Cart:</h2>}
          <h3>{procedure.name}</h3>
          <p>{procedure.duration} minutes @ {procedure.price}$</p>
        </div>
        <ButtonContained
          width="15%"
          onClick={() => {
            ModalStore.setModalStatus({
              action: 'additional_procedures',
              open: true,
            });
          }}
        >
          Book
        </ButtonContained>
      </div>
      <div className={s.BookingBox__content}>
        <p>
        {procedure.description}
        </p>
      </div>
    </div>
  );
};

export default BookingBox;
