import { JSONFetch, JSONFetchDelete, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

interface IGetUser {
  index: number;
  perPage: number;
  filterLike?: string | boolean;
  column?: string;
  value?: string;
}

export interface IEmployee {
  id?: number;
  first_name: 'string';
  last_name: 'string';
  phone: 'string';
  email: 'string';
  password: 'string';
  rights: 'employee';
  saloon_id: number;
}

export class UserService {
  async getEmployees({ index, perPage, filterLike }: IGetUser) {
    const r = await JSONFetchGet(
      `users?index=${index}&per_page=${perPage}${
        filterLike ? `&filter_like=${filterLike}` : ''
      }&column=rights&value=employee`,
    );

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async getAllEmployees() {
    const r = await JSONFetchGet('users?column=rights&value=employee');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async getEmployee(id: string | number) {
    const r = await JSONFetchGet(`users/${id}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/employees' });
    }
  }

  async createEmployee(createEmployee: IEmployee) {
    const r = await JSONFetch('create_user', createEmployee);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/employees' });
    }
  }

  async createAdmin(createAdmin: IEmployee) {
    const r = await JSONFetch('create_user', createAdmin);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/employees' });
    }
  }

  async updateEmployee(updateEmployee: IEmployee) {
    const r = await JSONFetch('update_user', updateEmployee);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/employees' });
    }
  }

  async deleteEmployee(id: number) {
    const r = await JSONFetchDelete(`delete_user/${id}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/employees' });
    }
  }

  /* Sources */
  async getSources() {
    const r = await JSONFetchGet('sources');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/calendar' });
    }
  }

  async addSource(id: number) {
    const r = await JSONFetch('add_source_weight', { id });

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/calendar' });
    }
  }
}
