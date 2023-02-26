import { observable } from 'mobx';
import { ProcedureData } from './Procedures.store';

type Action = 'complete_booking' | 'loader' | 'error' | 'success' | 'deleteItem' | null;

interface IModalStatus {
  open: boolean;
  action: Action;
  redirectUrl?: string | null;
  procedure?: ProcedureData | null;
}

export interface IDeleteItem {
  deleteType: 'pack' | 'procedure' | '';
  id: number | null;
}

export interface IModalStore {
  modalStatus: IModalStatus;
  deleteItem: IDeleteItem;
  setModalStatus: (status: IModalStatus) => void;
  setDeleteItem: (deleteItem: IDeleteItem) => void;
}

export const ModalStore = observable<IModalStore>({
  modalStatus: {
    open: false,
    action: null,
    redirectUrl: null,
    procedure: null,
  },
  deleteItem: {
    deleteType: '',
    id: null,
  },
  setModalStatus({ open, action, redirectUrl, procedure }) {
    this.modalStatus = {
      open,
      redirectUrl,
      action,
      procedure,
    };
  },
  setDeleteItem({ deleteType, id }) {
    this.deleteItem = {
      deleteType,
      id,
    };
  },
});
