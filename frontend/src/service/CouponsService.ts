import { JSONFetch, JSONFetchDelete, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

interface ICoupon {
  name: string;
  code: string;
  procedure_ids: number[];
  discount: number;
  expiry_date: string;
  id?: number;
}

export class CouponsService {
  async getCoupons(index: number, perPage: number, filterLike?: string | boolean) {
    const r = await JSONFetchGet(
      `coupon?index=${index}&per_page=${perPage}${filterLike ? `&filter_like=${filterLike}` : ''}`,
    );

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/coupons' });
    }
  }

  async getCoupon(id: string | number) {
    const r = await JSONFetchGet(`coupon/${id}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/coupons' });
    }
  }

  async updateCoupon(updateCoupon: ICoupon) {
    const r = await JSONFetch('update_coupon', updateCoupon);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/coupons' });
    }
  }

  async createCoupon(createCoupon: ICoupon) {
    const r = await JSONFetch('create_coupon', createCoupon);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/coupons' });
    }
  }

  async deleteCoupon(couponId: number) {
    const r = await JSONFetchDelete(`delete_coupon/${couponId}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/coupons' });
    }
  }
}
