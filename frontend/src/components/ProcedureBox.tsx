import React, { useState } from 'react';
import { ButtonContained, ButtonDelete, ButtonEdit } from './base/Button';
import { Checkbox } from './base/Checkbox';
import { ModalStore } from '../store/Modal.store';
import { ProceduresStore } from '../store/Procedures.store';
import { ProcedureData } from '../store/Procedures.store';
import { ProceduresService } from '../service/ProceduresService';
import { Input, TextArea } from './base/Input';
import { TailSpinFixed } from './TailSpin';
import AddPassanger from './AddPassanger';
import DatePicker from 'react-datepicker';
import useForm from '../utils/useForm';
import { filterAddPassengers, filterObjectToArray } from '../utils/funcs';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '../store/Auth.store';
import { saloon_ids } from '../utils/staticData';

import s from './ProcedureBox.scss';

interface IBookingBox {
  width?: string;
  type?: 'main' | 'modal';
  procedure?: ProcedureData | null | any;
}

const ProcedureBox: React.FC<IBookingBox> = ({ width = '100%', type = 'main', procedure }) => {
  const navigate = useNavigate();
  const proceduresService = new ProceduresService();
  const [optionalProcedures, setOptionalProcedures] = useState({});
  const { inputs, handleChange, clearForm, resetForm } = useForm(procedure);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saloonIds, setSaloonIds] = useState<number[]>([]);

  // Add Passengers State
  const [procedures, setProcedures] = useState<any>(() => ProceduresStore.proceduresStatus.proceduresData || null); // TBD TS
  const [items, setItems] = useState<any>([]); // TBD TS

  // Edit Button
  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    console.log('UPDATING DATA...', inputs);
    const r = await proceduresService.updateProcedure({ ...inputs, saloon_ids: saloonIds });
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

  // Filter optional proc-s

  // Open/Submit Modal
  const handleModal = () => {
    if (type === 'main') {
      ModalStore.setModalStatus({
        action: 'complete_booking',
        open: true,
        procedure: procedure,
      });
    } else {
      // Main Passanger
      console.log('Main Passanger Booked:', {
        proc_id: procedure?.id,
        opt_proc_id: filterObjectToArray(optionalProcedures),
        date: startDate,
      });
      sessionStorage.setItem(
        'main_passanger',
        JSON.stringify({
          proc_id: procedure?.id,
          opt_proc_id: filterObjectToArray(optionalProcedures),
          date: startDate,
        }),
      );

      // Other Passangers
      console.log('Additional Passengers Booked:', filterAddPassengers(items));
      sessionStorage.setItem('add_passangers', JSON.stringify(filterAddPassengers(items)));

      ModalStore.setModalStatus({
        action: null,
        open: false,
        procedure: null,
      });

      navigate('/userInfo');
    }
  };

  // Delete Procedure Box
  const deleteHandler = async () => {
    ModalStore.setDeleteItem({ deleteType: 'procedure', id: procedure.id });
    ModalStore.setModalStatus({ open: true, action: 'deleteItem' });
  };

  return (
    <div
      id={procedure?.id.toString()}
      className={type === 'main' ? s.BookingBox : s.BookingBoxModal}
      style={{ width: width }}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {loading ? (
            <TailSpinFixed />
          ) : (
            <div>
              <div className={s.BookingBoxForm__inputs}>
                <div>
                  <Input required label="Name:" type="text" name="name" value={inputs?.name} onChange={handleChange} />
                  <br />
                  <Input
                    required
                    min="0"
                    label="Price (EUR):"
                    type="number"
                    name="price"
                    value={inputs?.price}
                    onChange={handleChange}
                  />
                  <br />
                  <Input
                    required
                    min="0"
                    label="Price (GBP):"
                    type="number"
                    name="price_gbp"
                    value={inputs?.price_gbp}
                    onChange={handleChange}
                  />
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
                </div>

                <div>
                  <TextArea
                    required
                    value={inputs?.description}
                    label="Description:"
                    name="description"
                    rows={5}
                    onChange={handleChange}
                  />
                  <br />
                  <div className={s.BookingBoxForm__saloons}>
                    <h3>Available Studios:</h3>
                    {saloon_ids.map((saloon) => (
                      <Checkbox
                        style={{ marginRight: '0.5rem' }}
                        onChange={(e: boolean) =>
                          e === true
                            ? setSaloonIds([...saloonIds, saloon.value])
                            : setSaloonIds([...saloonIds].filter((el) => el !== saloon.value))
                        }
                        key={saloon.id}
                      >
                        {saloon.text}
                      </Checkbox>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', width: '100%' }}>
                <ButtonContained width="200px" type="submit">
                  Save
                </ButtonContained>
                <ButtonContained
                  style={{ backgroundColor: 'rgba(119, 119, 119, 0.511)', marginLeft: '15px' }}
                  onClick={toggleEdit}
                  width="200px"
                >
                  Cancel
                </ButtonContained>
              </div>
            </div>
          )}
        </form>
      ) : (
        <div className={type === 'modal' ? s.BookingBox__main : null} style={{ width: '100%' }}>
          <div className={s.BookingBox__header}>
            <div className={s.BookingBox__header_column}>
              {ModalStore.modalStatus.open && <h2>Passenger 1 Cart:</h2>}
              {/* {ModalStore.modalStatus.open && <h4></h4>} */}
              <h3>{procedure?.name}</h3>
              <p>
                {procedure?.duration} minutes @ {procedure?.price}€
              </p>
            </div>
            <div className={s.BookingBox__header_btns}>
              {type === 'main' && (
                <ButtonContained width="100px" onClick={handleModal}>
                  Book
                </ButtonContained>
              )}
              {type === 'main' && AuthStore.rights === 'admin' && (
                <>
                  <ButtonEdit width="75px" onClick={toggleEdit}>
                    Edit
                  </ButtonEdit>
                  <ButtonDelete width="75px" onClick={deleteHandler}>
                    Delete
                  </ButtonDelete>
                </>
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
      )}

      {type === 'modal' && ProceduresStore.proceduresStatus.optionalProceduresData && (
        <>
          <AddPassanger setProcedures={setProcedures} items={items} setItems={setItems} />
          <div className={s.BookingBox__datepicker}>
            <p style={{ marginBottom: '5px' }}>Choose Date:</p>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              minDate={new Date()}
              minTime={setHours(setMinutes(new Date(), 0), 10)}
              maxTime={setHours(setMinutes(new Date(), 0), 20)}
              timeIntervals={5}
              dateFormat="MMMM d, yyyy HH:mm"
              inline
            />
          </div>

          <ButtonContained onClick={handleModal} style={{ marginTop: '1.5rem' }}>
            Book
          </ButtonContained>
        </>
      )}
    </div>
  );
};

export default ProcedureBox;
