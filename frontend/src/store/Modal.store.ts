import { observable } from 'mobx';

type Action = 'additional_procedures' | 'loader' | null;

interface IModalStatus {
  open: boolean;
  action: Action;
  redirectUrl?: string | null;
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
  },
  setModalStatus({ open, action, redirectUrl }) {
    this.modalStatus = {
      open,
      redirectUrl,
      action,
    };
  },
});
