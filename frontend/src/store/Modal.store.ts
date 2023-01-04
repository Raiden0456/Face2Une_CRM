import { observable } from 'mobx';

type Action = 'complete_booking' | 'loader' | 'error' | 'success' | null;

export type ProcedureData = { id: number; name: string; description: string; price: number; duration: number } | null;

interface IModalStatus {
  open: boolean;
  action: Action;
  redirectUrl?: string | null;
  procedureData?: ProcedureData;
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
    procedureData: null,
  },
  setModalStatus({ open, action, redirectUrl, procedureData }) {
    this.modalStatus = {
      open,
      redirectUrl,
      action,
      procedureData,
    };
  },
});
