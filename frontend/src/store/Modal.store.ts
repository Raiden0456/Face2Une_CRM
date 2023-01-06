import { observable } from 'mobx';
import { ProcedureData, OptionalProcedureData } from './Procedures.store';

type Action = 'complete_booking' | 'loader' | 'error' | 'success' | null;

interface IModalStatus {
  open: boolean;
  action: Action;
  redirectUrl?: string | null;
  procedure?: ProcedureData | null;
}

export interface IModalStore {
  modalStatus: IModalStatus;
  setModalStatus: (status: IModalStatus) => void;
}

export const ModalStore = observable<IModalStore>({
  modalStatus: {
    open: false,
    action: null,
    redirectUrl: null,
    procedure: null,
  },
  setModalStatus({ open, action, redirectUrl, procedure }) {
    this.modalStatus = {
      open,
      redirectUrl,
      action,
      procedure
    };
  },
});
