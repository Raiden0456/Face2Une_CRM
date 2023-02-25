import React, { useState } from 'react';
import { ButtonContained, ButtonOutlined } from './base/Button';
import { ProceduresService } from '../service/ProceduresService';
import { Input } from './base/Input';
import { TailSpinFixed } from './TailSpin';
import useForm from '../utils/useForm';

import { useNavigate } from 'react-router-dom';
import { AuthStore } from '../store/Auth.store';

import s from './ProcedureBox.scss';
import { ModalStore } from '../store/Modal.store';

interface IBookingBox {
  width?: string;
  packageItem?: any;
}

const PackageBox: React.FC<IBookingBox> = ({ width = '100%', packageItem }) => {
  const navigate = useNavigate();
  const proceduresService = new ProceduresService();
  const { inputs, handleChange, clearForm, resetForm } = useForm(packageItem);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Edit Button
  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    const r = await proceduresService.updatePackage(inputs);
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
                  <ButtonContained
                    width="75px"
                    style={{ backgroundColor: 'rgba(119, 119, 119, 0.511)' }}
                    onClick={toggleEdit}
                  >
                    Edit
                  </ButtonContained>
                  <ButtonOutlined width="75px" onClick={deleteHandler}>
                    Delete
                  </ButtonOutlined>
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
