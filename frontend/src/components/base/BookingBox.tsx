import React from 'react';
import classNames from 'classnames/bind';
import { ButtonContained } from '../base/Button';
import { ModalStore } from '../../store/Modal.store';

import s from './BookingBox.scss';

interface IBookingBox {
  width?: string;
  type?: 'main' | 'modal';
}

const BookingBox: React.FC<IBookingBox> = ({ width = '100%', type = 'main' }) => {
  return (
    <div className={type === 'main' ? s.BookingBox : s.BookingBoxModal} style={{ width: width }}>
      <div className={s.BookingBox__header}>
        <div className={s.BookingBox__header_column}>
          {ModalStore.modalStatus.open && <h2>Your Cart:</h2>}
          <h3>Back to basics</h3>
          <p>30 minutes @ 55$</p>
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
          The Signature manual sculpting technique, suitable for anyone. The basic need to sustain youthful look &amp;
          plump, radiant skin. / Le modelage manuel signature convient à tout. La base fondamentale pour conserver une
          appearance jeune et une peau pulpeuse et radieuse.
        </p>
      </div>
    </div>
  );
};

export default BookingBox;
