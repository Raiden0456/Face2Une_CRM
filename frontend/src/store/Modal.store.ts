import { observable } from 'mobx';
import { ProcedureData } from './Procedures.store';

type Action =
  | 'complete_booking'
  | 'loader'
  | 'error'
  | 'success'
  | 'deleteItem'
  | 'addItem'
  | 'addAppointment'
  | 'scheduling'
  | 'clientOrder'
  | null;

interface IModalStatus {
  open: boolean;
  action: Action;
  redirectUrl?: string | null;
  procedure?: ProcedureData | null;
}

export interface IDeleteItem {
  deleteType: 'pack' | 'procedure' | 'certificate' | 'coupon' | 'employee' | 'schedule' | '';
  id: number | null;
}

export interface IAddItem {
  addType: 'coupon' | 'employee' | 'admin' | 'appointment' | '';
  edit: boolean;
  id: number | null;
}

export interface IScheduling {
  schedulingType: 'workDays' | 'launchTime' | '';
  edit: boolean;
}

export interface IClientOrder {
  clientId: number | null;
  email: string;
}

export interface IModalStore {
  modalStatus: IModalStatus;
  deleteItem: IDeleteItem;
  addItem: IAddItem;
  scheduling: IScheduling;
  clientOrder: IClientOrder;
  setModalStatus: (status: IModalStatus) => void;
  setDeleteItem: (deleteItem: IDeleteItem) => void;
  setAddItem: (addItem: IAddItem) => void;
  setScheduling: (scheduling: IScheduling) => void;
  setClientOrder: (clientOrder: IClientOrder) => void;
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
  addItem: {
    addType: '',
    edit: false,
    id: null,
  },
  scheduling: {
    schedulingType: '',
    edit: false,
  },
  clientOrder: {
    clientId: null,
    email: '',
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
  setAddItem({ addType, edit, id }) {
    this.addItem = {
      addType,
      edit,
      id,
    };
  },
  setScheduling({ schedulingType, edit }) {
    this.scheduling = {
      schedulingType,
      edit,
    };
  },
  setClientOrder({ clientId, email }) {
    this.clientOrder = {
      clientId,
      email,
    };
  },
});
