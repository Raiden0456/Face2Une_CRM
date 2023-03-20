import React, { useState } from 'react';
import { ButtonContained, ButtonOutlined } from './base/Button';
import { ProceduresService } from '../service/ProceduresService';
import { Input } from './base/Input';
import { TailSpinFixed } from './TailSpin';
import useForm from '../utils/useForm';
import { ModalStore } from '../store/Modal.store';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '../store/Auth.store';

import s from './ProcedureBox.scss';

interface IBookingBox {
  width?: string;
  certItem?: any;
}

const CertificateBox: React.FC<IBookingBox> = ({ width = '100%', certItem }) => {
  const navigate = useNavigate();
  const proceduresService = new ProceduresService();
  const { inputs, handleChange, clearForm, resetForm } = useForm(certItem);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id, name, price, price_gbp } = certItem;

  // Edit Button
  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    const r = await proceduresService.updateCertificate(inputs);
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
      'buy_certificate',
      JSON.stringify({
        id,
        name,
        price,
        price_gbp,
      }),
    );

    navigate('/confirmation-certificate');
  };

  // Delete Package Box
  const deleteHandler = async () => {
    ModalStore.setDeleteItem({ deleteType: 'certificate', id });
    ModalStore.setModalStatus({ open: true, action: 'deleteItem' });
  };

  return (
    <div id={id?.toString()} className={s.BookingBox} style={{ width: width }}>
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
              <h3>{name}</h3>
              <p>{price}€</p>
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

export default CertificateBox;
