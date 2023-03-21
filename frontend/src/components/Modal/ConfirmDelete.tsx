import React, { useState } from 'react';
import { ButtonContained, ButtonDelete, ButtonOutlined } from '../base/Button';
import { ProceduresService } from '../../service/ProceduresService';
import { CouponsService } from '../../service/CouponsService';
import { UserService } from '../../service/UserService';
import { IDeleteItem, ModalStore } from '../../store/Modal.store';
import { TailSpinFixed } from '../TailSpin';

import s from './ConfirmDelete.scss';

const ConfirmDelete: React.FC<IDeleteItem> = ({ deleteType, id }) => {
  const proceduresService = new ProceduresService();
  const couponService = new CouponsService();
  const userService = new UserService();
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
    if (deleteType === 'certificate' && typeof id === 'number') {
      const r = await proceduresService.deleteCertificate(id);
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
    if (deleteType === 'employee' && typeof id === 'number') {
      const r = await userService.deleteEmployee(id);
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
            <ButtonDelete onClick={deleteHandler} style={{ marginRight: '15px', width: '100%' }}>
              Delete
            </ButtonDelete>
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
