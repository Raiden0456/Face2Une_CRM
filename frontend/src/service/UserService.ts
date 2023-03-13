import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

interface IGetUser {
  index: number;
  perPage: number;
  filterLike?: string | boolean;
  column?: string;
  value?: string;
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
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }
}
