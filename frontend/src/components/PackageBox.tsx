import React, { useState } from 'react';
import { ButtonContained, ButtonDelete, ButtonEdit } from './base/Button';
import { ProceduresService } from '../service/ProceduresService';
import { Input } from './base/Input';
import { TailSpinFixed } from './TailSpin';
import useForm from '../utils/useForm';
import { ModalStore } from '../store/Modal.store';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '../store/Auth.store';
import { Radio } from './base/Checkbox';
import { ProceduresStore } from '../store/Procedures.store';

import s from './ProcedureBox.scss';

interface IBookingBox {
  width?: string;
  packageItem?: any;
}

const PackageBox: React.FC<IBookingBox> = ({ width = '100%', packageItem }) => {
  const navigate = useNavigate();
  const proceduresService = new ProceduresService();
  const { inputs, handleChange, clearForm, resetForm } = useForm(packageItem);
  const [procID, setProcID] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Edit Button
  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    const r = await proceduresService.updatePackage({ ...inputs, procedure_id: procID });
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

  const handleProceed = () => {
    sessionStorage.setItem(
      'buy_package',
      JSON.stringify({
        id: packageItem.id,
        amount: packageItem.amount,
        price: packageItem.price,
        name: packageItem.name,
      }),
    );

    navigate('/confirmation-package');
  };

  // Delete Package Box
  const deleteHandler = async () => {
    ModalStore.setDeleteItem({ deleteType: 'pack', id: packageItem.id });
    ModalStore.setModalStatus({ open: true, action: 'deleteItem' });
  };

  return (
    <div id={packageItem?.id.toString()} className={s.BookingBox} style={{ width: width }}>
      {isEditing ? (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {loading ? (
            <TailSpinFixed />
          ) : (
            <>
              <Input required label="Name:" type="text" name="name" value={inputs?.name} onChange={handleChange} />
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
              <Input
                required
                min="0"
                label="Amount:"
                type="number"
                name="amount"
                value={inputs?.amount}
                onChange={handleChange}
              />
              <br />
              <div className={s.BookingBox__optionalProcedures}>
                <h4>Select Procedure(s):</h4>
                <div>
                  {ProceduresStore.proceduresStatus.proceduresData?.map((proc, i) => (
                    <Radio
                      required
                      name="procedures"
                      value={proc.id}
                      style={{ marginRight: '0.5rem' }}
                      onChange={(e) => setProcID(Number(e))}
                      key={proc.id}
                    >
                      {proc.name}
                    </Radio>
                  ))}
                </div>
              </div>
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
        <div style={{ width: '100%' }}>
          <div className={s.BookingBox__header}>
            <div className={s.BookingBox__header_column}>
              <h3>
                Package: {packageItem?.amount} {packageItem?.name}
              </h3>
              <p>{packageItem?.price}€</p>
            </div>
            <div className={s.BookingBox__header_btns}>
              <ButtonContained width="100px" onClick={handleProceed}>
                Buy
              </ButtonContained>
              {AuthStore.rights === 'admin' && (
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
        </div>
      )}
    </div>
  );
};

export default PackageBox;
