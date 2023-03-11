import { JSONFetch, JSONFetchDelete, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';
import { PromocodeData } from '../store/Promocodes.store';

export class PromocodesService {
  
  async getPromocodes(index: number, perPage: number, filterLike?: string | boolean) {
    const r = await JSONFetchGet(`clients?index=${index}&per_page=${perPage}${filterLike ? `&filter_like=${filterLike}` : ''}`,);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async getPromocode(id: number | string | null) {
    const r = await JSONFetchGet(`promo/${id}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async updatePromocode(updatePromocode: PromocodeData) {
    const r = await JSONFetch('update_promo', updatePromocode);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }


  async createPromocode(createPromocode: PromocodeData) {
    const r = await JSONFetch('create_promo', createPromocode);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async deletePromocode(promocodeId: number) {
    const r = await JSONFetchDelete(`delete_promo/${promocodeId}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }
}
