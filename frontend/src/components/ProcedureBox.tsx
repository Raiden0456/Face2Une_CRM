import React from 'react';
import { ModalStore } from '../store/Modal.store';
import { ProcedureData } from '../store/Procedures.store';

import s from './BookingBox.scss';

interface IBookingBox {
  procedure?: ProcedureData | null | any;
  addProcedures?: any;
}

const ProcedureBox: React.FC<IBookingBox> = ({ procedure, addProcedures }) => {
  return (
    <div id={procedure?.id.toString()} className={s.BookingBox}>
      <div className={s.BookingBox__header} style={{ margin: '0' }}>
        <h3>{procedure?.name}</h3>
        <p>
          {procedure?.duration} minutes @ {procedure?.price}€
        </p>
      </div>
      {addProcedures.length > 0 && (
        <div
          className={s.BookingBox__content}
          style={{ margin: '1rem 0 0 0', display: 'flex', flexDirection: 'column' }}
        >
          {addProcedures?.map((proc: any, index: number) => (
            <p style={{ marginBottom: '0.5rem' }} key={proc.id}>
              + {proc.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProcedureBox;
