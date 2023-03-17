import React, { useState } from 'react';
import { ButtonContained, ButtonOutlined } from '../base/Button';
import { ProceduresService } from '../../service/ProceduresService';
import { CouponsService } from '../../service/CouponsService';

import s from './ConfirmDelete.scss';
import { IDeleteItem, ModalStore } from '../../store/Modal.store';
import { TailSpinFixed } from '../TailSpin';

const ConfirmDelete: React.FC<IDeleteItem> = ({ deleteType, id }) => {
  const proceduresService = new ProceduresService();
  const couponService = new CouponsService();
  const [loading, setLoading] = useState<boolean>(false);

  // Delete Handler
  const deleteHandler = async () => {
    setLoading(true);

    if (deleteType === 'pack' && typeof id === 'number') {
      const r = await proceduresService.deletePackage(id);
      if (r.success) {
        console.log('Successfully Deleted!');
        window.location.reload();
      }
    }
    if (deleteType === 'procedure' && typeof id === 'number') {
      const r = await proceduresService.deleteProcedure(id);
      if (r.success) {
        console.log('Successfully Deleted!');
        window.location.reload();
      }
    }
    if (deleteType === 'coupon' && typeof id === 'number') {
      const r = await couponService.deleteCoupon(id);
      if (r.success) {
        console.log('Successfully Deleted!');
        window.location.reload();
      }
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <TailSpinFixed />
      ) : (
        <div className={s.ConfirmDelete}>
          <div className={s.ConfirmDelete__content}>
            <p>Are you sure you want to delete this item?</p>
          </div>
          <div className={s.ConfirmDelete__footer}>
            <ButtonContained onClick={deleteHandler} style={{ marginRight: '15px', width: '100%' }}>
              Delete
            </ButtonContained>
            <ButtonOutlined onClick={() => ModalStore.setModalStatus({ open: false, action: null })}>
              Cancel
            </ButtonOutlined>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDelete;