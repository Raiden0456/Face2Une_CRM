import { JSONFetch, JSONFetchDelete, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';
import { CouponData } from '../store/Coupons.store';

export class CouponsService {
  
  async getCoupons(index: number, perPage: number, filterLike?: string | boolean) {
    const r = await JSONFetchGet(`coupon?index=${index}&per_page=${perPage}${filterLike ? `&filter_like=${filterLike}` : ''}`,);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async getCoupon(id: number | string | null) {
    const r = await JSONFetchGet(`coupon/${id}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async updateCoupon(updateCoupon: CouponData) {
    const r = await JSONFetch('update_coupon', updateCoupon);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }


  async createCoupon(createCoupon: CouponData) {
    const r = await JSONFetch('create_coupon', createCoupon);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async deleteCoupon(couponId: number) {
    const r = await JSONFetchDelete(`delete_coupon/${couponId}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }
}