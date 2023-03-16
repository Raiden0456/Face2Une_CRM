import React, { useEffect, useState } from 'react';
import { ButtonContained, ButtonOutlined } from '../base/Button';
import { CouponsService } from '../../service/CouponsService';
import useForm from '../../utils/useForm';
import { IAddItem, ModalStore } from '../../store/Modal.store';
import { TailSpinFixed } from '../TailSpin';
import { Input } from '../base/Input';
import { ProceduresStore } from '../../store/Procedures.store';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { filterObjectToArray } from '../../utils/funcs';
import { Checkbox } from '../base/Checkbox';
import ReactDatePicker from 'react-datepicker';

import s from './AddItem.scss';

const AddItem: React.FC<IAddItem> = ({ addType, id, edit }) => {
  const couponService = new CouponsService();
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [procedures, setProcedures] = useState({});
  const { inputs, handleChange, clearForm, resetForm, setInputs } = useForm({
    name: '',
    code: '',
    discount: '',
  });

  useEffect(() => {
    if (edit && id) {
      setLoading(true);
      couponService.getCoupon(id).then((r) => {
        if (r.success) {
          const { name, code, discount } = r.data[0];
          setInputs({
            name,
            code,
            discount,
          });
          setLoading(false);
        }
      });
    }
  }, []);

  // Add Item Handler
  const handleSubmit = async () => {
    setLoading(true);

    if (addType === 'coupon') {
      if (!edit) {
        couponService
          .createCoupon({ ...inputs, procedure_ids: filterObjectToArray(procedures), expiry_date: startDate })
          .then((r) => {
            if (r.success) {
              console.log('Successfully Added!');
              window.location.reload();
            }
          });
      } else {
        couponService
          .updateCoupon({ ...inputs, procedure_ids: filterObjectToArray(procedures), expiry_date: startDate, id })
          .then((r) => {
            if (r.success) {
              console.log('Successfully Updated!');
              window.location.reload();
            }
          });
      }
    }

    setLoading(false);
  };

  const handleCheckBoxes = (e: any, id: number) => {
    setProcedures({ ...procedures, [id]: e });
  };

  return (
    <>
      {loading ? (
        <TailSpinFixed />
      ) : (
        <div className={s.AddItem}>
          <form
            id="AddItem"
            onSubmit={(e) => {
              e.preventDefault();
              if (filterObjectToArray(procedures).length) {
                handleSubmit();
              }
            }}
            className={s.AddItemForm}
          >
            {edit ? <h2>Edit Coupon</h2> : <h2>Create a New Coupon</h2>}
            <div className={s.AddItemForm__inputs}>
              <div>
                <Input
                  required
                  className={s.Input}
                  name="name"
                  label="Name:"
                  type="text"
                  value={inputs?.name}
                  onChange={handleChange}
                />
                <br />
                <Input
                  required
                  className={s.Input}
                  name="code"
                  label="Code:"
                  type="text"
                  value={inputs?.code}
                  onChange={handleChange}
                />
                <br />
                <Input
                  required
                  className={s.Input}
                  name="discount"
                  label="Discount:"
                  type="number"
                  min="0"
                  value={inputs?.discount}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className={s.AddItemForm__procs}>
                  <h3>Available Procedures:</h3>
                  {ProceduresStore.proceduresStatus.proceduresData?.map((proc, i) => (
                    <Checkbox style={{ marginRight: '0.5rem' }} onChange={(e) => handleCheckBoxes(e, proc.id)} key={i}>
                      {proc.name}
                    </Checkbox>
                  ))}
                </div>
                <br />
                <div className={s.AddItem__datepicker}>
                  <p style={{ marginBottom: '5px' }}>Choose Expirity Date:</p>
                  <ReactDatePicker
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
              </div>
            </div>

            <ButtonContained disabled={loading} type="submit">
              Add Coupon
            </ButtonContained>
          </form>
        </div>
      )}
    </>
  );
};

export default AddItem;
