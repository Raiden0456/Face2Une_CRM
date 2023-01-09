import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { ButtonContained } from '../base/Button';
import { Checkbox } from '../base/Checkbox';
import { ModalStore } from '../../store/Modal.store';
import { ProceduresStore } from '../../store/Procedures.store';
import { ProcedureData } from '../../store/Procedures.store';
import { ProceduresService } from '../../service/ProceduresService';
import { Input, TextArea } from './Input';
import { TailSpinFixed } from '../TailSpin';
import DatePicker from 'react-datepicker';
import useForm from '../../utils/useForm';

import s from './BookingBox.scss';

interface IBookingBox {
  width?: string;
  type?: 'main' | 'modal';
  procedure?: ProcedureData | null | any;
}

const BookingBox: React.FC<IBookingBox> = ({ width = '100%', type = 'main', procedure }) => {
  const proceduresService = new ProceduresService();
  const [optionalProcedures, setOptionalProcedures] = useState({});
  const { inputs, handleChange, clearForm, resetForm } = useForm(procedure);
  const [startDate, setStartDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Edit Button
  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    console.log('SENDING DATA...', inputs);
    const r = await proceduresService.updateProcedure(inputs);
    if (r.success) {
      console.log('Successfully Updated!');
      window.location.reload();
    }

    setLoading(false);
    setIsEditing(false);
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  // Pick additional_proc
  const handleCheckBoxes = (e: any, id: number) => {
    setOptionalProcedures({ ...optionalProcedures, [id]: e });
  };

  // Open/Submit Modal
  const handleModal = () => {
    if (type === 'main') {
      ModalStore.setModalStatus({
        action: 'complete_booking',
        open: true,
        procedure: procedure,
      });
    } else {
      console.log('Procedure ID:', procedure?.id);
      console.log('Additional Procedures:', optionalProcedures);
      console.log('Date Selected:', startDate);

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
      {isEditing ? (
        <form onSubmit={handleSubmit} style={{ width: '50%' }}>
          {loading ? (
            <TailSpinFixed />
          ) : (
            <>
              <Input required label="Name:" type="text" name="name" value={inputs?.name} onChange={handleChange} />
              <br />
              <Input
                required
                min="0"
                label="Duration:"
                type="number"
                name="duration"
                value={inputs?.duration}
                onChange={handleChange}
              />
              <br />
              <Input
                required
                min="0"
                label="Price:"
                type="number"
                name="price"
                value={inputs?.price}
                onChange={handleChange}
              />
              <br />
              <TextArea
                required
                value={inputs?.description}
                label="Description:"
                name="description"
                rows={5}
                onChange={handleChange}
              />
              <br />
              <div style={{ display: 'flex' }}>
                <ButtonContained type="submit">Save</ButtonContained>
                <ButtonContained
                  style={{ backgroundColor: 'rgba(119, 119, 119, 0.511)', marginLeft: '15px', minWidth: '35%' }}
                  onClick={toggleEdit}
                >
                  Cancel
                </ButtonContained>
              </div>
            </>
          )}
        </form>
      ) : (
        <div>
          <div className={s.BookingBox__header}>
            <div className={s.BookingBox__header_column}>
              {ModalStore.modalStatus.open && <h2>Your Cart:</h2>}
              <h3>{procedure?.name}</h3>
              <p>
                {procedure?.duration} minutes @ {procedure?.price}€
              </p>
              <div>
                Choose Date:{' '}
                {type === 'modal' && <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />}
              </div>
            </div>
            <div className={s.BookingBox__header_btns}>
              <ButtonContained width="20%" onClick={handleModal}>
                Book
              </ButtonContained>
              {type === 'main' && (
                <ButtonContained
                  width="5%"
                  style={{ backgroundColor: 'rgba(119, 119, 119, 0.511)' }}
                  onClick={toggleEdit}
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
      )}

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
