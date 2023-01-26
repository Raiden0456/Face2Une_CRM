import React from 'react';
import { ModalStore } from '../store/Modal.store';
import { ProcedureData } from '../store/Procedures.store';

import s from './BookingBox.scss';

interface IBookingBox {
  procedure?: ProcedureData | null | any;
}

const ProcedureBox: React.FC<IBookingBox> = ({ procedure }) => {
  return (
    <div id={procedure?.id.toString()} className={s.BookingBox}>
      <div className={s.BookingBox__header}>
        <div className={s.BookingBox__header_column}>
          <h3>{procedure?.name}</h3>
          <p>
            {procedure?.duration} minutes @ {procedure?.price}€
          </p>
        </div>
      </div>
      <div className={s.BookingBox__content}>
        <p>{procedure?.description}</p>
      </div>
    </div>
  );
};

export default ProcedureBox;
