import React from 'react';
import classNames from 'classnames/bind';
import { ButtonContained } from '../base/Button';
import { ModalStore } from '../../store/Modal.store';
import { ProcedureData } from '../../store/Modal.store';

import s from './BookingBox.scss';

interface IBookingBox {
  width?: string;
  type?: 'main' | 'modal';
  procedure?: ProcedureData;
}

const BookingBox: React.FC<IBookingBox> = ({ width = '100%', type = 'main', procedure }) => {
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
          <ButtonContained
            width="20%"
            onClick={() => {
              type === 'main'
                ? ModalStore.setModalStatus({
                    action: 'complete_booking',
                    open: true,
                    procedureData: procedure,
                  })
                : ModalStore.setModalStatus({
                    action: null,
                    open: false,
                    procedureData: null,
                  });
            }}
          >
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
    </div>
  );
};

export default BookingBox;
