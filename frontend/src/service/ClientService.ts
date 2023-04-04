import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

export interface NewClient {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export class ClientService {
  async getClient(email: string) {
    const r = await JSONFetchGet(`clients?column=email&value=${email}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async getClient_n(phone: string) {
    const r = await JSONFetchGet(`clients?column=phone&value=${phone}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async getClients(index: number, perPage: number, filterLike?: string | boolean) {
    const r = await JSONFetchGet(
      `clients?index=${index}&per_page=${perPage}${filterLike ? `&filter_like=${filterLike}` : ''}`,
    );

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async createClient({ firstName, lastName, phone, email }: NewClient, redirectUrl: string = '/') {
    const r = await JSONFetch('create_client', {
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
    });

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl });
    }
  }
}
