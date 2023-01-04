import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

export class ProceduresService {
  async getProcedures() {
    const r = await JSONFetchGet('main_proc');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/fallback_page' });
    }
  }
}
