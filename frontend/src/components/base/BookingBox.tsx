import React from 'react';
import classNames from 'classnames/bind';
import { ButtonContained } from '../base/Button';

import s from './BookingBox.scss';

const BookingBox = () => {
  return (
    <div className={s.BookingBox}>
      <div className={s.BookingBox__header}>
        <div className={s.BookingBox__header_column}>
          <h3>Back to basics</h3>
          <p>30 minutes @ 55$</p>
        </div>
        <ButtonContained width="15%">Book</ButtonContained>
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
