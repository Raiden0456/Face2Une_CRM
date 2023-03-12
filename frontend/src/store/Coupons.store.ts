import { observable } from 'mobx';

export type CouponData = {
  id: number;
  name: string;
  code: string;
  procedure_ids: number[];
  discount: number;
  expiry_date: Date;
};

interface ICouponsStatus {
  couponsData?: CouponData[] | null;
}

export interface ICouponsStore {
  couponsStatus: ICouponsStatus;
  setCouponsStatus: (status: ICouponsStatus) => void;
}

export const CouponsStore = observable<ICouponsStore>({
  couponsStatus: {
    couponsData: null,
  },
  setCouponsStatus({ couponsData }) {
    this.couponsStatus = {
      couponsData
    };
  },
});
